import { Profile } from '../gulp.types'

const profile: Profile = (paths) => ({
  app: {
    styles: [paths.resources + '/.profiles/tailwind/main.css'],
  },
})

export default profile
