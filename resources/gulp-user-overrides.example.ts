import { UserOverride } from '../gulp-config/gulp.types'

const override: UserOverride = (
  paths,
  {
    bootstrapIcons,
    bootstrapV3_jQuery,
    bootstrapV4_jQuery,
    bootstrapV5,
    codIcons,
    devIcons,
    fontAwesomeV4,
    fontAwesomeV5,
    fontAwesomeV6,
    ionIcons,
    jQuery,
    materialDesignIcons,
    materialIcons,
    materialize,
    mdBootstrap_jQuery,
    mdb3,
    remixIcon,
    typIcons,
    weatherIcons,
    tailwind,
  },
) => ({
  templates: [],
  nodeAssets: [],
  vendor: {
    scripts: [],
    styles: [],
  },
  app: {
    scripts: ['app.js'],
    styles: ['app.scss'],
  },
  includeFromAssetFolder: [],
  excludeFromAssetFolder: [],
  assetRevisioning: false,
  assetRevisioningFilter: [],
  babelSettings: {},
  tailwindConfig: undefined,
  purgeCss: false,
  minify: true,
  removeComments: true,
  stripDebugging: true,
})

export default override
