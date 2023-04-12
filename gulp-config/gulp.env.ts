import * as path from 'path'
import normalize from 'normalize-path'
import fs from 'fs'
import getProfiles from './gulp.profiles'
import { IConfig, UserOverride } from './gulp.types'

const root = normalize(path.resolve('.'))
const production = process.env.NODE_ENV === 'production'

export const paths = {
  root,
  project: production ? 'dist' : 'public',
  resources: 'resources',
  build: `${production ? 'dist' : 'public'}/assets`,
  node: 'node_modules',
}

let userOverride: ReturnType<UserOverride> | undefined

if (fs.existsSync(`${paths.resources}/gulp-user-overrides.ts`)) {
  const override = require('../resources/gulp-user-overrides')
  userOverride = override.default(
    { node: `${paths.node}/`, libs: `${paths.resources}/libs/` },
    getProfiles(paths),
  )
}

const includeFromAssetFolder = [
  ...new Set([
    ...[
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
      'woff2',
    ],
    ...(userOverride?.includeFromAssetFolder ?? []),
  ]),
].filter(
  (ext) =>
    !userOverride?.excludeFromAssetFolder ||
    userOverride.excludeFromAssetFolder.includes(ext),
)

const assetRevisioningFilter: string[] | undefined = [
  ...new Set([
    ...['json', 'gif', 'jpeg', 'jpg', 'png', 'webp'],
    ...(userOverride?.assetRevisioningFilter ?? []),
  ]),
]

const babelSettings = {
  plugins: [
    [
      '@babel/plugin-proposal-class-properties',
      {
        // loose: true,
      },
    ],
  ],
}

const server = {
  server:
    process.env.APP_BROWSERSYNC_SERVER && !process.env.APP_BROWSERSYNC_PROXY
      ? process.env.APP_BROWSERSYNC_SERVER
      : './public',
  proxy:
    process.env.APP_BROWSERSYNC_PROXY && !process.env.APP_BROWSERSYNC_SERVER
      ? process.env.APP_BROWSERSYNC_PROXY
      : undefined,
  host: process.env.APP_BROWSERSYNC_HOST
    ? process.env.APP_BROWSERSYNC_HOST
    : 'localhost',
  port: Number(process.env.APP_BROWSERSYNC_PORT) || 3000,
  startPath: process.env.APP_BROWSERSYNC_START_PATH ?? '/',
  notify: false,
  watchOptions: {
    ignoreInitial: true,
    ignored: ['node_modules'],
  },
  open:
    !process.argv.some((arg) => arg === 'nodemon') &&
    (process.env.APP_BROWSERSYNC_OPEN == null
      ? true
      : !!process.env.APP_BROWSERSYNC_OPEN),
  https: process.env.APP_BROWSERSYNC_SSL_KEY
    ? {
        key: process.env.APP_BROWSERSYNC_SSL_KEY,
        cert: process.env.APP_BROWSERSYNC_SSL_CRT,
      }
    : undefined,
}

const config: IConfig = {
  paths: {
    ...paths,
  },
  sources: {
    html: [`${paths.resources}/public/**/*`],
    views: [
      `${paths.resources}/public/**/*.php`,
      `${paths.resources}/views/**/*.php`,
    ],
    assets: includeFromAssetFolder.length
      ? [
          `${paths.resources}/assets/**/*.+(${includeFromAssetFolder.join(
            '|',
          )})`,
        ]
      : undefined,
    nodeAssets: [
      ...(userOverride?.templates?.flatMap(
        (template) => template.nodeAssets || [],
      ) ?? []),
      ...(userOverride?.nodeAssets?.map((file) => `${paths.node}/${file}`) ??
        []),
      ...(!userOverride?.nodeAssets?.length ? [] : []),
    ],
    app: {
      styles: [
        ...(userOverride?.templates?.flatMap(
          (template) => template.app?.styles ?? [],
        ) ?? []),
        ...(userOverride?.app?.styles?.map(
          (file) => `${paths.resources}/src/scss/${file}`,
        ) ?? [`${paths.resources}/src/scss/app.scss`]),
      ],
      scripts: [
        ...(userOverride?.app?.scripts?.map(
          (file) => `${paths.resources}/src/${file}`,
        ) ?? [`${paths.resources}/src/app.js`]),
      ],
      babelSettings: { ...babelSettings, ...userOverride?.babelSettings },
    },
    vendor: {
      styles: [
        ...(userOverride?.templates?.flatMap(
          (template) => template.vendor?.styles ?? [],
        ) ?? []),
        ...(userOverride?.vendor?.styles?.map((file) => file) ?? []),
        ...(!userOverride?.vendor?.styles?.length
          ? [`${paths.resources}/libs/**/*.+(css|scss)`]
          : []),
      ],
      scripts: [
        ...(userOverride?.templates?.flatMap(
          (template) => template.vendor?.scripts ?? [],
        ) ?? []),
        ...(userOverride?.vendor?.scripts?.map((file) => file) ?? []),
        ...(!userOverride?.vendor?.scripts?.length
          ? [`${paths.resources}/libs/**/*.js`]
          : []),
      ],
    },
  },
  server: {
    ...server,
  },
  purgeCss: userOverride?.purgeCss ?? false,
  assetRevisioning: userOverride?.assetRevisioning ?? false,
  assetRevisioningFilter,
  production,
  tailwindConfig: !userOverride?.tailwindConfig
    ? undefined
    : {
        mode: 'jit',
        content: [
          `${paths.resources}/public/**/*.php`,
          `${paths.resources}/views/**/*.php`,
          ...(userOverride?.app?.scripts?.map(
            (file) => `${paths.resources}/src/${file}`,
          ) ?? [`${paths.resources}/src/app.js`]),
        ],
        darkMode: 'class',
        theme: {
          extend: {},
        },
        variants: {
          extend: {},
        },
        plugins: [],
        ...(userOverride?.tailwindConfig as any),
      },
}

export default config
