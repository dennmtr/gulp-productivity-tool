import { Profile } from '../gulp.types'

const profile: Profile = (paths) => ({
  vendor: {
    styles: [paths.resources + '/.profiles/bootstrap/bootstrap.scss'],
    scripts: [paths.node + '/bootstrap/dist/js/bootstrap.bundle.min.js'],
  },
})

export default profile
