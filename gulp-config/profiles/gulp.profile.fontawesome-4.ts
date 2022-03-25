import { Profile } from '../gulp.types'

const profile: Profile = (paths) => ({
  nodeAssets: [paths.node + '/font-awesome/fonts/*.+(eot|svg|ttf|woff|woff2)'],
  vendor: {
    styles: [paths.resources + '/.profiles/font-awesome-4/font-awesome.scss'],
  },
})

export default profile
