import { Profile } from '../gulp.types'

const profile: Profile = (paths) => ({
  nodeAssets: [
    paths.node + '/material-design-icons/iconfont/*.+(eot|svg|ttf|woff|woff2)',
  ],
  vendor: {
    styles: [paths.node + '/material-design-icons/iconfont/material-icons.css'],
  },
})

export default profile
