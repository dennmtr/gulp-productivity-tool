import { Profile } from '../gulp.types'

const profile: Profile = (paths) => ({
  vendor: {
    styles: [paths.resources + '/.profiles/bootstrap-4/bootstrap.scss'],
    js: [
      paths.node + '/jquery/dist/jquery.min.js',
      paths.node + '/bootstrap4/dist/js/bootstrap.bundle.min.js',
    ],
  },
})

export default profile
