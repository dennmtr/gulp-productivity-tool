import { Profile } from '../gulp.types'

const profile: Profile = (paths) => ({
  vendor: {
    styles: [paths.resources + '/.profiles/mdb3/mdb.free.scss'],
    js: [paths.node + '/mdb-ui-kit/js/mdb.min.js'],
  },
})

export default profile
