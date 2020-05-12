/* eslint-disable @typescript-eslint/no-var-requires */
import { createError } from './error'
import fs from 'fs'

function loadConfig (): any {
  try {
    const configUrl = 'https://github.com/fastrojs/fastro-firestore/blob/master/server.config.js'
    const configFile = process.cwd() + '/server.config.js'
    if (!fs.existsSync(configFile)) {
      throw new Error(`Config is not found. Create a 'server.config.js' file on your root project folder. 
      Check this: ${configUrl}`)
    }
    const config = require(configFile)
    delete config.default
    const { app } = config
    if (!app) throw new Error(`'app' field is empty. check this: ${configUrl}`)
    return config
  } catch (error) {
    throw createError('LOAD_CONFIG_ERROR', error)
  }
}

const configuration = loadConfig()

export { configuration }
