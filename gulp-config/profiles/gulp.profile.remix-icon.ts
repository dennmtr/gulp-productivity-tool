import { Profile } from '../gulp.types'

const profile: Profile = (paths) => ({
  nodeAssets: [paths.node + '/remixicon/fonts/*.+(eot|svg|ttf|woff|woff2)'],
  vendor: {
    styles: [paths.node + '/remixicon/fonts/remixicon.css'],
  },
})

export default profile
