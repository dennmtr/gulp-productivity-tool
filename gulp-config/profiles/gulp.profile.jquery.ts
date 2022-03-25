import { Profile } from '../gulp.types'

const profile: Profile = (paths) => ({
  vendor: {
    scripts: [paths.node + '/jquery/dist/jquery.min.js'],
  },
})

export default profile
