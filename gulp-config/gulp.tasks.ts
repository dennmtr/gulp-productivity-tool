import del from 'del'
import fs from 'fs'
import * as t from './gulp.helpers'
import * as f from './gulp.factory'
import { IConfig } from './gulp.types'

const purgeCssFrom = ($: IConfig) => [
  ...($.sources.views ?? []),
  ...($.sources.app?.scripts ?? []),
  ...($.sources.vendor?.scripts ?? []),
]

export const bundleAppScripts = ($: IConfig) =>
  function bundleAppScripts() {
    return $.sources.app?.scripts?.some((file) => fs.existsSync(file))
      ? t.createScriptTask(
          $.sources.app?.scripts ?? [],
          $.paths.build,
          false,
          $,
        )
      : Promise.resolve()
  }

export const bundleAppStyles = ($: IConfig) =>
  function bundleAppStyles() {
    return t.createStyleTask(
      $.sources.app?.styles ?? [],
      $.paths.build,
      false,
      purgeCssFrom($),
      $,
    )
  }

export const bundleVendorStyles = ($: IConfig) =>
  function bundleVendorStyles() {
    return t.createStyleTask(
      $.sources.vendor?.styles ?? [],
      $.paths.build,
      true,
      purgeCssFrom($),
      $,
    )
  }

export const bundleVendorScripts = ($: IConfig) =>
  function bundleVendorScripts() {
    return t.createScriptTask(
      $.sources.vendor?.scripts ?? [],
      $.paths.build,
      true,
      $,
    )
  }

export const copyAssetFiles = ($: IConfig) =>
  function copyAssetFiles() {
    return $.sources.assets
      ? t.createCopyTask(
          $.sources.assets,
          `${$.paths.resources}/assets`,
          $.paths.build,
          $,
          $.assetRevisioning,
        )
      : Promise.resolve()
  }

export const copyAssetsFromNode = ($: IConfig) =>
  function copyAssetsFromNode() {
    return $.sources.nodeAssets
      ? t.createCopyTask($.sources.nodeAssets, null, $.paths.build, $, false)
      : Promise.resolve()
  }

export const copyFiles = ($: IConfig) =>
  function copyFiles() {
    return $.sources.html
      ? t.createCopyTask($.sources.html, null, $.paths.project, $, false)
      : Promise.resolve()
  }

export const deleteManifest = ($: IConfig, force = false) =>
  function deleteManifest() {
    return f.deleteManifest($, force)
  }

export const cleanFolderContent = ($: IConfig) =>
  function cleanFolderContent() {
    if ($.assetRevisioning && !$.production) {
      return f.cleanCache(
        $.paths.build,
        `**/*.+(js|css|map${
          $.assetRevisioningFilter?.length
            ? `|${$.assetRevisioningFilter.join('|')}`
            : ''
        })`,
        $.paths.resources,
      )
    }
    if (!$.production) {
      return Promise.resolve()
    }
    return f
      .mv('rev-manifest.json', $.paths.project)
      .then(() => del('rev-manifest.json', { force: true }))
  }
