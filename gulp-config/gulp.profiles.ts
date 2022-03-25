import ionicons from './profiles/gulp.profile.ionicons'
import bootstrapIcons from './profiles/gulp.profile.bootstrap-icons'
import fontAwesomeV4 from './profiles/gulp.profile.fontawesome-4'
import fontAwesomeV5 from './profiles/gulp.profile.fontawesome-5'
import materialIcons from './profiles/gulp.profile.material-icons'
import jQuery from './profiles/gulp.profile.jquery'
import bootstrapV3_jQuery from './profiles/gulp.profile.bootstrap-3'
import bootstrapV4_jQuery from './profiles/gulp.profile.bootstrap-4'
import bootstrapV5 from './profiles/gulp.profile.bootstrap-5'
import materialize from './profiles/gulp.profile.materialize'
import mdb3 from './profiles/gulp.profile.mdb3'
import mdBootstrap_jQuery from './profiles/gulp.profile.mdbootstrap'
import devicons from './profiles/gulp.profile.devicons'
import materialDesignIcons from './profiles/gulp.profile.material-design-icons'
import remixIcon from './profiles/gulp.profile.remix-icon'
import typIcons from './profiles/gulp.profile.typ-icons'
import codicons from './profiles/gulp.profile.codicons'
import weatherIcons from './profiles/gulp.profile.weather-icons'
import tailwind from './profiles/gulp.profile.tailwind'
import { IPath, Template } from './gulp.types'

export default function (paths: IPath): Template {
  return {
    ionicons: ionicons(paths),
    bootstrapIcons: bootstrapIcons(paths),
    fontAwesomeV4: fontAwesomeV4(paths),
    fontAwesomeV5: fontAwesomeV5(paths),
    materialIcons: materialIcons(paths),
    jQuery: jQuery(paths),
    bootstrapV3_jQuery: bootstrapV3_jQuery(paths),
    bootstrapV4_jQuery: bootstrapV4_jQuery(paths),
    bootstrapV5: bootstrapV5(paths),
    materialize: materialize(paths),
    mdb3: mdb3(paths),
    mdBootstrap_jQuery: mdBootstrap_jQuery(paths),
    devicons: devicons(paths),
    materialDesignIcons: materialDesignIcons(paths),
    remixIcon: remixIcon(paths),
    typIcons: typIcons(paths),
    codicons: codicons(paths),
    weatherIcons: weatherIcons(paths),
    tailwind: tailwind(paths),
  }
}
