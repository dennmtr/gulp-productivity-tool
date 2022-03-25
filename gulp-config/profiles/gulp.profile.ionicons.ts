import { Profile } from '../gulp.types'

const profile: Profile = (paths) => ({
  nodeAssets: [
    paths.node! + '/ionicons/dist/fonts/*.+(eot|svg|ttf|woff|woff2)',
  ],
  vendor: {
    styles: [paths.resources! + '/.profiles/ionicons/ionicons.scss'],
  },
})

export default profile
