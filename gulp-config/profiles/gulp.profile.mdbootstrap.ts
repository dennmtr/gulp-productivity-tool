import { Profile } from '../gulp.types'

const profile: Profile = (paths) => ({
  nodeAssets: [],
  vendor: {
    styles: [paths.resources + '/.profiles/mdbootstrap/mdb-free.scss'],
    js: [
      paths.node + '/mdbootstrap/js/jquery.min.js',
      paths.node + '/mdbootstrap/js/popper.min.js',
      paths.node + '/mdbootstrap/js/bootstrap.min.js',
      paths.node + '/mdbootstrap/js/mdb.min.js',
    ],
  },
})

export default profile
