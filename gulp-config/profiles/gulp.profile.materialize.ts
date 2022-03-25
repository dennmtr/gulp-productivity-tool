import { Profile } from '../gulp.types'

const profile: Profile = (paths) => ({
  nodeAssets: [],
  vendor: {
    styles: [paths.resources + '/.profiles/materialize/materialize.scss'],
    scripts: [paths.node + '/materialize-css/dist/js/materialize.min.js'],
  },
})

export default profile
