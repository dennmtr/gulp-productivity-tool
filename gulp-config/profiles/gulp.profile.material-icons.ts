import { Profile } from '../gulp.types'

const profile: Profile = (paths) => ({
  nodeAssets: [
    paths.node + '/material-icons/iconfont/*.+(eot|svg|ttf|woff|woff2)',
  ],
  vendor: {
    styles: [paths.resources + '/.profiles/material-icons/material-icons.scss'],
  },
})

export default profile
