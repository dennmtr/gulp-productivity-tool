import { Profile } from '../gulp.types'

const profile: Profile = (paths) => ({
  nodeAssets: [
    paths.node + '/typicons.font/src/font/*.+(eot|svg|ttf|woff|woff2)',
  ],
  vendor: {
    styles: [paths.node + '/typicons.font/src/font/typicons.css'],
  },
})

export default profile
