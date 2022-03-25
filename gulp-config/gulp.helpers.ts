import { IConfig } from './gulp.types'
import * as f from './gulp.factory'
import glob from 'glob'

const withArray = (sourcePath: string[] | string) =>
  Array.isArray(sourcePath) && sourcePath.length === 1
    ? sourcePath[0]
    : sourcePath

export const parseFiles = (arr: string[]) =>
  arr.reduce((i, j) => i.concat(glob.sync(j) as never[]), [])

export const createCopyTask = (
  sourcePath: string | string[],
  basePath: string | null,
  targetPath: string,
  config: IConfig,
  assetRevisioning = true,
) =>
  sourcePath.length
    ? f.bundleAssets(
        withArray(sourcePath),
        basePath,
        targetPath,
        config,
        assetRevisioning,
      )
    : Promise.resolve()

export const createStyleTask = (
  sourcePath: string | string[],
  targetPath: string,
  vendor: boolean,
  purgeCssFrom: string[],
  config: IConfig,
) =>
  sourcePath.length
    ? f.bundleStyles(
        withArray(sourcePath),
        targetPath,
        vendor,
        purgeCssFrom,
        config,
      )
    : Promise.resolve()

export const createScriptTask = (
  sourcePath: string | string[],
  targetPath: string,
  vendor: boolean,
  config: IConfig,
) =>
  sourcePath.length
    ? vendor
      ? f.bundleLibs(withArray(sourcePath), targetPath, config)
      : f.bundleAppScripts(withArray(sourcePath), targetPath, config)
    : Promise.resolve()
