import { Profile } from '../gulp.types'

const profile: Profile = (paths) => ({
  nodeAssets: [
    paths.node +
      '/@fortawesome/fontawesome-free/webfonts/*.+(eot|svg|ttf|woff|woff2)',
  ],
  vendor: {
    styles: [paths.resources + '/.profiles/font-awesome-5/fontawesome.scss'],
  },
})

export default profile
