import { Profile } from '../gulp.types'

const profile: Profile = (paths) => ({
  nodeAssets: [paths.node + '/devicons/fonts/*.+(eot|svg|ttf|woff|woff2)'],
  vendor: {
    styles: [paths.resources + '/.profiles/devicons/devicons.scss'],
  },
})

export default profile
