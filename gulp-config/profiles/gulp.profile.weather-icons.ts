import { Profile } from '../gulp.types'

const profile: Profile = (paths) => ({
  nodeAssets: [paths.node + '/weathericons/font/*.+(eot|svg|ttf|woff|woff2)'],
  vendor: {
    styles: [paths.resources + '/.profiles/weather-icons/weather-icons.scss'],
  },
})

export default profile
