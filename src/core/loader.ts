import glob from 'glob-promise'
import { createError } from './error'
// import { configuration } from './configuration'

export function getSourceDir (): string {
  const sourceDir = process.env.NODE_ENV === 'test'
    ? '/src' : '/dist'

  const targetDir = process.cwd() + sourceDir
  return targetDir
}

export const moduleLoader = async (globPattern: string): Promise<any> => {
  try {
    const targetDir = getSourceDir()
    const cwd = targetDir
    const files = await glob(globPattern, { cwd, ignore: '{**/*.spec, spec}.*s' })
    return files.map(file => require(`${targetDir}/${file}`))
  } catch (error) {
    throw createError('MODULE_LOADER_ERROR', error)
  }
}

export const loader = async (): Promise<any[]> => {
  return moduleLoader('**/*.{service,controller,gateway}.*s')
}

export const pluginsLoader = async (): Promise<any[]> => {
  return moduleLoader('**/*.plugin.*s')
}
