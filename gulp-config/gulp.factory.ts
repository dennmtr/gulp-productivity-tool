import fs from 'fs'
import deleteEmpty from 'delete-empty'
import glob from 'glob'
import path from 'path'
import del from 'del'
import * as gulp from 'gulp'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import tsify from 'tsify'
import buffer from 'vinyl-buffer'
import dartSass from 'sass'
import tailwindcss from 'tailwindcss'
import { ParsedPath } from 'gulp-rename'
import { GlobPath, IConfig, IGulpPlugins } from './gulp.types'

const $: IGulpPlugins = require('gulp-load-plugins')({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  postRequireTransforms: {
    sass: (sass: (resolver: unknown) => unknown) => {
      return sass(dartSass)
    },
  },
})

export const clearCache = (cb?: () => unknown) => {
  return $.cache.clearAll(cb)
}

export const deleteManifest = ($: IConfig, force = false) => {
  if (!$.production && force === false) {
    return Promise.resolve()
  }
  return del([$.paths.project, 'rev-manifest.json'], { force: true })
}

export const mv = async (source: GlobPath, target: string) =>
  new Promise((resolve) => {
    gulp
      .src(source, { allowEmpty: true, base: '.', dot: true })
      .pipe(gulp.dest(target))
      .on('end', resolve)
  })

export const cleanCache = (
  basePath: string,
  sourcePath: string,
  resourcesPath: string,
) => {
  const manifestFile = 'rev-manifest.json'
  const delProps: glob.IOptions & del.Options = {
    cwd: basePath,
    dot: true,
    realpath: false,
  }
  let manifestJson: Record<string, string>
  try {
    const jsonString = fs.readFileSync(manifestFile, 'utf8')
    manifestJson = JSON.parse(jsonString)
  } catch {
    return Promise.resolve()
  }
  const orphanFiles = Object.entries(manifestJson)
    .map(([key, val]) =>
      !['vendor', 'app'].some((baseName) => key.split('.')[0] === baseName) &&
      !fs.existsSync(path.resolve(`${resourcesPath}/assets/${key}`))
        ? val
        : null,
    )
    .filter((f) => f) as string[]
  Object.entries(manifestJson).forEach(
    ([key, value]) => orphanFiles.includes(value) && delete manifestJson[key],
  )
  const validFiles = Object.values(manifestJson)
  return del(
    glob.sync(sourcePath, delProps).filter((file) => {
      if (path.extname(file) === '.map') {
        const dirName = ['.', '..'].some((name) =>
          name.includes(path.dirname(file)),
        )
          ? ''
          : `${path.dirname(file)}/`
        return !validFiles.includes(dirName + path.basename(file, '.map'))
      }
      return !validFiles.includes(file)
    }),
    delProps,
  ).then(() => {
    fs.writeFileSync(manifestFile, JSON.stringify(manifestJson, null, 2))
    return del(orphanFiles, delProps as del.Options).then(() =>
      deleteEmpty(path.resolve(basePath)),
    )
  })
}

export const bundleAssets = (
  sourcePath: string | string[],
  basePath: string | null,
  targetPath: string,
  config: IConfig,
  assetRevisioning = true,
) => {
  if (
    assetRevisioning &&
    (config.assetRevisioning ?? true) &&
    config.assetRevisioningFilter?.length
  ) {
    const allWithoutFilter = $.filter(
      `**/!(*.+(${config.assetRevisioningFilter.join('|')}))`,
      {
        restore: true,
      },
    )
    const onlyFilter = $.filter(
      `**/*.+(${config.assetRevisioningFilter.join('|')})`,
      {
        restore: false,
      },
    )
    return gulp
      .src(sourcePath, {
        allowEmpty: true,
        base: basePath ?? undefined,
        dot: true,
      })
      .pipe(allWithoutFilter)
      .pipe($.if(config.production && (config.minify ?? true), $.jsonminify()))
      .pipe(gulp.dest(targetPath))
      .pipe(allWithoutFilter.restore)
      .pipe(onlyFilter)
      .pipe($.if(config.production, $.jsonminify()))
      .pipe($.if(config.assetRevisioning ?? true, $.rev()))
      .pipe(gulp.dest(targetPath))
      .pipe(
        $.if(
          config.assetRevisioning ?? true,
          $.rev.manifest({
            base: targetPath,
            merge: true,
          }),
        ),
      )
      .pipe($.if(config.assetRevisioning ?? true, gulp.dest(targetPath)))
  }
  return gulp
    .src(sourcePath, {
      allowEmpty: true,
      base: basePath ?? undefined,
      dot: true,
    })
    .pipe($.if(config.production && (config.minify ?? true), $.jsonminify()))
    .pipe(
      $.if(!!assetRevisioning && (config.assetRevisioning ?? true), $.rev()),
    )
    .pipe(gulp.dest(targetPath))
    .pipe(
      $.if(
        !!assetRevisioning && (config.assetRevisioning ?? true),
        $.rev.manifest({
          base: targetPath,
          merge: true,
        }),
      ),
    )
    .pipe(
      $.if(
        assetRevisioning && (config.assetRevisioning ?? true),
        gulp.dest(targetPath),
      ),
    )
}

export const bundleLibs = (
  sourcePath: string | string[],
  targetPath: string,
  config: IConfig,
) =>
  gulp
    .src(sourcePath, { allowEmpty: true, base: '.', dot: true })
    .pipe(
      $.rename({
        dirname: '.',
      }),
    )
    .pipe(
      $.lineEndingCorrector({
        eolc: 'LF',
        encoding: 'utf8',
      }),
    )
    .pipe($.removeSourcemaps())
    .pipe(
      $.if(
        config.production && (config.removeComments ?? true),
        $.stripComments(),
      ),
    )
    .pipe(
      $.if(
        config.production && (config.stripDebugging ?? true),
        $.stripDebug(),
      ),
    )
    // .pipe($.removeUseStrict({ force: true }))
    .pipe(
      $.if(
        config.production && !!config.sources.vendor?.babelSettings,
        $.babel(config.sources.vendor?.babelSettings),
      ),
    )
    .pipe($.if(config.production, $.removeEmptyLines()))
    .pipe($.concat({ path: 'vendor.js' }))
    .pipe($.if(config.production && (config.minify ?? true), $.uglify()))
    .pipe($.if(config.assetRevisioning ?? true, $.rev()))
    .pipe(
      $.if(
        config.production,
        $.rename((path: ParsedPath) => ({
          dirname: path.dirname,
          basename: path.basename.split('.js')[0],
          extname:
            path.extname !== '.js'
              ? `.min.js${path.extname}`
              : `.min${path.extname}`,
        })),
      ),
    )
    .pipe(gulp.dest(targetPath))
    .pipe(
      $.if(
        config.assetRevisioning ?? true,
        $.rev.manifest({
          base: targetPath,
          merge: true,
        }),
      ),
    )
    .pipe($.if(config.assetRevisioning ?? true, gulp.dest(targetPath)))

export const bundleAppScripts = (
  sourcePath: string | string[],
  targetPath: string,
  config: IConfig,
) =>
  (
    browserify({
      basedir: '.',
      debug: false,
      entries: sourcePath,
      cache: {},
      packageCache: {},
    })
      .plugin(tsify)
      .transform('babelify', {
        presets: ['@babel/preset-env'],
        extensions: ['.js', '.ts'],
        ...config.sources.app?.babelSettings,
      }) as any
  )
    .bundle()
    .pipe(source(`app.js`))
    .pipe(buffer())
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe(
      $.if(
        config.production && (config.removeComments ?? true),
        $.stripComments(),
      ),
    )
    .pipe(
      $.if(
        config.production && (config.stripDebugging ?? true),
        $.stripDebug(),
      ),
    )
    // .pipe($.if(production, $.removeEmptyLines()))
    .pipe($.if(config.production && (config.minify ?? true), $.uglify()))
    .pipe($.if(config.assetRevisioning ?? true, $.rev()))
    .pipe(
      $.sourcemaps.write('.', {
        sourceMappingURL: (file) =>
          `${file.basename.split('.js')[0]}${
            config.production ? '.min' : ''
          }.js.map`,
      }),
    )
    .pipe(
      $.if(
        config.production,
        $.rename((path) => ({
          dirname: path.dirname,
          basename: path.basename.split('.js')[0],
          extname:
            path.extname !== '.js'
              ? `.min.js${path.extname}`
              : `.min${path.extname}`,
        })),
      ),
    )
    .pipe(gulp.dest(targetPath))
    .pipe(
      $.if(
        config.assetRevisioning ?? true,
        $.rev.manifest({
          base: targetPath,
          merge: true,
        }),
      ),
    )
    .pipe($.if(config.assetRevisioning ?? true, gulp.dest(targetPath)))

export const bundleStyles = (
  sourcePath: string | string[],
  targetPath: string,
  vendor: boolean,
  config: IConfig,
  purge_content: string[] = [],
) =>
  gulp
    .src(sourcePath, { allowEmpty: true, base: '.', dot: true })
    .pipe(
      $.lineEndingCorrector({
        eolc: 'LF',
        encoding: 'utf8',
      }),
    )
    .pipe($.if(!vendor, $.sourcemaps.init()))
    .pipe(
      $.sass({
        includePaths: [
          'node_modules',
          `gulp-config/profiles/fallback`,
          `${config.paths.resources}/.profiles`,
          `${config.paths.resources}/src/scss`,
        ],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      }).on('error', $.sass.logError),
    )
    .pipe(
      $.postcss(
        [
          ...(!vendor && config.tailwindConfig != null
            ? [tailwindcss(config.tailwindConfig)]
            : []),
          require('postcss-single-charset'),
          ...(config.production
            ? [
                require('postcss-discard-comments')({ removeAll: true }),
                require('postcss-delete-duplicate-css'),
                require('postcss-discard-empty'),
              ]
            : []),
          config.production && (config.purgeCss ?? true) && purge_content
            ? require('postcss-purgecss')({
                content: purge_content,
              })
            : null,
          require('autoprefixer'),
          config.production && (config.minify ?? true)
            ? require('postcss-minify')
            : null,
        ].filter((notEmpty) => notEmpty),
      ),
    )
    .pipe(
      $.rename({
        dirname: '.',
      }),
    )
    .pipe($.concat(`${vendor ? 'vendor' : 'app'}.css`))
    .pipe($.if(config.assetRevisioning ?? true, $.rev()))
    .pipe(
      $.if(
        !vendor,
        $.sourcemaps.write('.', {
          sourceMappingURL: (file) =>
            `${file.basename.split('.css')[0]}${
              config.production ? '.min' : ''
            }.css.map`,
        }),
      ),
    )
    .pipe(
      $.if(
        config.production,
        $.rename((path) => ({
          dirname: path.dirname,
          basename: path.basename.split('.css')[0],
          extname:
            path.extname !== '.css'
              ? `.min.css${path.extname}`
              : `.min${path.extname}`,
        })),
      ),
    )
    .pipe(gulp.dest(targetPath))
    .pipe(
      $.if(
        config.assetRevisioning ?? true,
        $.rev.manifest({
          base: targetPath,
          merge: true,
        }),
      ),
    )
    .pipe($.if(config.assetRevisioning ?? true, gulp.dest(targetPath)))
