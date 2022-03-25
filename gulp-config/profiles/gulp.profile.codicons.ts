import { Profile } from '../gulp.types'

const profile: Profile = (paths) => ({
  nodeAssets: [
    paths.node + '/@vscode/codicons/dist/*.+(eot|svg|ttf|woff|woff2)',
  ],
  vendor: {
    styles: [paths.node + '/@vscode/codicons/dist/codicon.css'],
  },
})

export default profile
