import { Profile } from '../gulp.types'

const profile: Profile = (paths) => ({
  nodeAssets: [
    paths.node +
      '/bootstrap-sass/assets/fonts/bootstrap/*.+(eot|svg|ttf|woff|woff2)',
  ],
  vendor: {
    styles: [paths.resources + '/.profiles/bootstrap-3/bootstrap.scss'],
    scripts: [
      paths.node + '/jquery/dist/jquery.min.js',
      paths.node + '/bootstrap-sass/assets/javascripts/bootstrap.min.js',
    ],
  },
})

export default profile
