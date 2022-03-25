import {
  watch as gulpWatch,
  series as gulpSeries,
  parallel as gulpParallel,
} from 'gulp'
import { create as createServer } from 'browser-sync'
import { EventEmitter } from 'events'
import $ from './gulp-config/gulp.env'
import * as t from './gulp-config/gulp.tasks'

const server = createServer()

const reload = (cb?: any) => {
  server.reload()
  typeof cb === 'function' && cb()
}

const reloadAsync = () => {
  const emitter = new EventEmitter()
  setTimeout(() => {
    reload()
    emitter.emit('')
  }, 500)
  return emitter
}

const watchSeries = (cb?: any) => {
  gulpWatch(
    $.paths.resources + '/src/**/*.+(js|ts)',
    { cwd: $.paths.root },
    gulpSeries(t.bundleAppScripts($), t.cleanFolderContent($), reload),
  )
  gulpWatch(
    [
      $.paths.resources + '/src/**/*.+(css|scss)',
      $.paths.resources + '/.profiles/**/+(_config.scss|_variables.scss)',
    ],
    { cwd: $.paths.root },
    gulpSeries(t.bundleAppStyles($), t.cleanFolderContent($), reload),
  )
  gulpWatch(
    [
      $.paths.resources + '/libs/**/*.+(css|scss)',
      $.paths.resources + '/.profiles/**/*.+(css|scss)',
    ],
    { cwd: $.paths.root },
    gulpSeries(t.bundleVendorStyles($), t.cleanFolderContent($), reload),
  )
  gulpWatch(
    $.paths.resources + '/libs/**/*.js',
    { cwd: $.paths.root },
    gulpSeries(t.bundleVendorScripts($), t.cleanFolderContent($), reload),
  )
  $.sources.assets &&
    gulpWatch(
      $.sources.assets,
      { cwd: $.paths.root },
      gulpSeries(t.copyAssetFiles($), t.cleanFolderContent($), reload),
    )
  $.sources.html &&
    gulpWatch(
      $.sources.html,
      { cwd: $.paths.root },
      gulpSeries(t.copyFiles($), reload),
    )

  if ($.tailwindConfig != false) {
    gulpWatch(
      [...($.sources.views ?? [])],
      { cwd: $.paths.root },
      gulpSeries(t.bundleAppStyles($), t.cleanFolderContent($), reload),
    )
  }
  gulpWatch(
    [
      'app/**/*.php',
      ...($.tailwindConfig == false ? $.sources.views ?? [] : []),
    ],
    { cwd: $.paths.root },
    reload,
  )
  typeof cb === 'function' && cb()
}

const serve = (cb?: any) => {
  server.init($.server)
  typeof cb === 'function' && cb()
}

const validate = (cb?: any) => {
  typeof cb === 'function' && cb()
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
