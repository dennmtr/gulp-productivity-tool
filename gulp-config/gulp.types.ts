import browserSync from 'browser-sync'
import babel from 'gulp-babel'
import cache from 'gulp-cache'
import filter from 'gulp-filter'
import gulpIf from 'gulp-if'
import jsonminify from 'gulp-jsonminify'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import rev from 'gulp-rev'
import strip from 'gulp-strip-comments'
import gulpStripDebug from 'gulp-strip-debug'
import concat from 'gulp-concat'
import sourcemaps from 'gulp-sourcemaps'
import sass from 'gulp-sass'
import GulpPostCss from 'gulp-postcss'

export interface IPath {
  root: string
  project: string
  resources: string
  build: string
  node: string
  libs?: string
}

export interface ISource {
  html?: string[]
  views?: string[]
  assets?: string[]
  /**
   * @example <caption>Usage:</caption>
   * // returns node_modules/font-awesome/fonts/icon.woff2, ...
   * nodeAssets['font-awesome/fonts/*.+(eot|svg|ttf|woff|woff2)']
   */
  nodeAssets?: string[]
  /**
   * app
   */
  app?: {
    /**
     * @example <caption>Usage:</caption>
     * // returns resources/src/scss/app.scss
     * styles['app.scss']
     */
    styles?: string[]
    /**
     * @example <caption>⚠️ CommonJS (Typescript), usage:</caption>
     * // returns resources/src/app.ts
     * scripts['app.ts']
     * @example <caption>⚠️ ESM/ES5/UMD, usage:</caption>
     * // returns resources/src/app.js
     * scripts['app.js']
     * // [...] import further libraries (ES5/UMD)
     */
    scripts?: string[]
    babelSettings?: any
  }
  /**
   * vendor
   */
  vendor?: {
    /**
     * @example <caption>Usage:</caption>
     * // returns resources/libs/quill.snow.css
     * scripts[paths.libs + 'quill.snow.css']
     * // returns node_modules/quill/dist/quill.snow.css
     * scripts[paths.node + 'quill/dist/quill.snow.css']
     */
    styles?: string[]
    /**
     * @example <caption>⚠️ Non modular content ES5/UMD, usage:</caption>
     * // returns resources/libs/popper.umd.js
     * styles[paths.libs + 'popper.js']
     * // returns node_modules/quill/dist/quill.js
     * styles[paths.node + 'quill/dist/quill.js']
     */
    scripts?: string[]
    babelSettings?: any
  }
}

export type Template = Record<string, ISource>

interface IOptions {
  /**
   *
   */
  assetRevisioning?: boolean
  /**
   * @example <caption>Default:</caption>
   *
   * assetRevisioningFilter['json', 'gif', 'jpeg', 'jpg', 'png', 'webp']
   *
   */
  assetRevisioningFilter?: string[]
  /**
   * Tailwind config overrides
   *
   *
   * Pass false to disable tailwind...
   *
   **  [Documentation](https://tailwindcss.com/docs/configuration)
   **  [Icons](https://heroicons.com/)
   */
  tailwindConfig?: any | false
  /**
   *PurgeCSS is a tool to remove unused CSS. It can be part of your development workflow.
   *When you are building a website, you might decide to use a CSS framework like TailwindCSS, Bootstrap, MaterializeCSS, Foundation, etc... But you will *only use a small set of the framework, and a lot of unused CSS styles will be included.
   *
   *This is where PurgeCSS comes into play. PurgeCSS analyzes your content and your CSS files. Then it matches the selectors used in your files with the one *in your content files. It removes unused selectors from your CSS, resulting in smaller CSS files.
   */
  purgeCss?: boolean
  /**
   * Minify JavaScript with UglifyJS3.
   */
  minify?: boolean
  /**
   * Removes comments from JSON/JavaScript, CSS/HTML, CPP/H, etc.
   */
  removeComments?: boolean
  /**
   * Strip console, alert, and debugger statements from JavaScript code with strip-debug.
   */
  stripDebugging?: boolean
}

/**
 *  Override default Gulp configuration
 *
 */
export type UserOverride = (
  paths: Partial<IPath>,
  templates: Template,
) => ISource &
  IOptions & {
    /**
    * Available options:
    *
    *
    - bootstrapIcons
    - bootstrapV3_jQuery
    - bootstrapV4_jQuery
    - bootstrapV5
    - codIcons
    - devIcons
    - fontAwesomeV4
    - fontAwesomeV5
    - fontAwesomeV6
    - ionIcons
    - jQuery
    - materialDesignIcons
    - materialIcons
    - materialize
    - mdBootstrap_jQuery
    - mdb3
    - remixIcon
    - typIcons
    - weatherIcons
    - tailwind
    *
    *  Documentation:
    *
    *
    - [Bootstrap theme configuration](https://bootstrap.build/app)
    - [Bootstrap icon list](https://icons.getbootstrap.com/)
    - [Bootstrap v3.3](https://getbootstrap.com/docs/3.3/css/#grid)
    - [Bootstrap v4.6](https://getbootstrap.com/docs/4.6/getting-started/introduction/)
    - [Bootstrap v5.1](https://getbootstrap.com/docs/5.1/getting-started/introduction/)
    - [Materiallize](https://materializecss.com/grid.html)
    - [mdBootstrap](https://mdbootstrap.com/docs/b4/jquery/layout/grid-usage/)
    - [mdb3](https://mdbootstrap.com/docs/standard/layout/css-grid/)
    - [codicon usage](https://github.com/microsoft/vscode-codicons#using-css-classes)
    - [codicon list](https://microsoft.github.io/vscode-codicons/dist/codicon.html)
    - [devicon list](https://devicon.dev/)
    - [fontawesome v4 list](https://fontawesome.com/v4.7/icons/)
    - [fontawesome v5 list](https://fontawesome.com/v5.15/icons?d=gallery&p=2&m=free)
    - [fontawesome v6 list](https://fontawesome.com/search?m=free)
    - [ionicon usage](https://ionic.io/ionicons/v4/usage)
    - [ionicon list](https://ionic.io/ionicons/v4)
    - [material design icon list](https://fonts.google.com/icons)
    - [materialize icon list](https://materializecss.com/icons.html)
    - [remixicon list](https://remixicon.com/)
    - [typicon list](https://www.s-ings.com/typicons/)
    - [weathericon list](https://erikflowers.github.io/weather-icons/)
    *
    * @example <caption>Usage:</caption>
    *
    * templates[bootstrapV5, fontAwesomeV5]
    *
    */
    templates?: ISource[]
    /**
   * @example <caption>Default:</caption>
   *
   * includeFromAssetFolder[
      'json',
      'gif',
      'jpeg',
      'jpg',
      'png',
      'svg',
      'webp',
      'svg',
      'eot',
      'ttf',
      'woff',
      'woff2'
    ]
   *
   */
    includeFromAssetFolder?: string[]
    /**
   * @example <caption>Usage:</caption>
   *
   * excludeFromAssetFolder[
      'jpeg',
      'jpg'
    ]
   *
   */
    excludeFromAssetFolder?: string[]
    /**
     *  - [Documentation](https://babeljs.io/docs/en/options#plugin-and-preset-options)
     */
    babelSettings?: any
  }

export type Profile = (paths: IPath) => ISource

export interface IConfig extends IOptions {
  paths: IPath
  sources: ISource
  server: browserSync.Options
  production: boolean
}

type UnknownGulpPlugin = (options?: unknown) => NodeJS.ReadWriteStream

export interface IGulpPlugins {
  rename: typeof rename
  cache: typeof cache
  filter: typeof filter
  if: typeof gulpIf
  jsonminify: typeof jsonminify
  uglify: typeof uglify
  rev: typeof rev
  lineEndingCorrector: UnknownGulpPlugin
  removeSourcemaps: UnknownGulpPlugin
  stripComments: typeof strip
  stripDebug: typeof gulpStripDebug
  babel: typeof babel
  removeEmptyLines: UnknownGulpPlugin
  concat: typeof concat
  sourcemaps: typeof sourcemaps
  sass: typeof sass
  postcss: typeof GulpPostCss
}

export type GlobPath = string | string[]
