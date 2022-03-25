import { Profile } from '../gulp.types'

const profile: Profile = (paths) => ({
  nodeAssets: [
    paths.node + '/bootstrap-icons/font/fonts/*.+(eot|svg|ttf|woff|woff2)',
  ],
  vendor: {
    styles: [
      paths.resources + '/.profiles/bootstrap-icons/bootstrap-icons.scss',
    ],
  },
})

export default profile
