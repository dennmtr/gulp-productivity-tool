import {
  parallel as gulpParallel,
  series as gulpSeries,
  watch as gulpWatch,
} from 'gulp'
import { create as createServer } from 'browser-sync'
import { EventEmitter } from 'events'
import $ from './gulp-config/gulp.env'
import * as t from './gulp-config/gulp.tasks'

const server = createServer()

const reload = (cb?: () => void) => {
  server.reload()
  cb?.()
}

const reloadAsync = () => {
  const emitter = new EventEmitter()
  setTimeout(() => {
    reload()
    emitter.emit('')
  }, 500)
  return emitter
}

const watchSeries = (cb?: () => unknown) => {
  gulpWatch(
    `${$.paths.resources}/src/**/*.+(js|ts)`,
    { cwd: $.paths.root },
    gulpSeries(t.bundleAppScripts($), t.cleanFolderContent($), reload),
  )
  gulpWatch(
    [`${$.paths.resources}/src/**/*.+(css|scss)`],
    { cwd: $.paths.root },
    gulpSeries(t.bundleAppStyles($), t.cleanFolderContent($), reload),
  )
  gulpWatch(
    [`${$.paths.resources}/libs/**/*.+(css|scss)`],
    { cwd: $.paths.root },
    gulpSeries(t.bundleVendorStyles($), t.cleanFolderContent($), reload),
  )
  gulpWatch(
    [`${$.paths.resources}/.profiles/**/*.+(css|scss)`],
    { cwd: $.paths.root },
    gulpSeries(
      gulpParallel(t.bundleVendorStyles($), t.bundleAppStyles($)),
      t.cleanFolderContent($),
      reload,
    ),
  )
  gulpWatch(
    `${$.paths.resources}/libs/**/*.js`,
    { cwd: $.paths.root },
    gulpSeries(t.bundleVendorScripts($), t.cleanFolderContent($), reload),
  )
  if ($.sources.assets)
    gulpWatch(
      $.sources.assets,
      { cwd: $.paths.root },
      gulpSeries(t.copyAssetFiles($), t.cleanFolderContent($), reload),
    )
  if ($.sources.html)
    gulpWatch(
      $.sources.html,
      { cwd: $.paths.root },
      gulpSeries(t.copyFiles($), reload),
    )

  if (!$.tailwindConfig) {
    gulpWatch(
      [...($.sources.views ?? [])],
      { cwd: $.paths.root },
      gulpSeries(t.bundleAppStyles($), t.cleanFolderContent($), reload),
    )
  }
  gulpWatch(
    ['app/**/*.php', ...(!$.tailwindConfig ? $.sources.views ?? [] : [])],
    { cwd: $.paths.root },
    reload,
  )
  cb?.()
}

const serve = (cb?: () => unknown) => {
  server.init($.server)
  cb?.()
}

const validate = (cb?: () => unknown) => {
  cb?.()
}

const commonTasks = (module.exports.build = gulpSeries(
  validate,
  t.deleteManifest($),
  t.bundleAppScripts($),
  t.bundleAppStyles($),
  t.bundleVendorStyles($),
  t.bundleVendorScripts($),
  t.copyFiles($),
  t.copyAssetFiles($),
  t.copyAssetsFromNode($),
  t.cleanFolderContent($),
))

const watchTask = (module.exports.watch = gulpSeries(
  validate,
  gulpParallel(serve, watchSeries),
))

module.exports.nodemon = gulpSeries(commonTasks, watchTask, reloadAsync)

module.exports.default = gulpSeries(commonTasks, watchTask)
