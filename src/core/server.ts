import { FastifyInstance, FastifyServerOptions } from 'fastify'
import { loader } from './loader'
import { configuration as config } from './configuration'
import { createError } from './error'
import { corePlugin } from './coreplugin'
import {
  initServer,
  createControllers,
  createGateways
} from './module.creator'

export async function createServer (options: FastifyServerOptions): Promise<FastifyInstance> {
  try {
    await loader()
    const server = await initServer(options)
    const gateways = createGateways()
    const controllers = createControllers()
    server
      .register(gateways)
      .register(controllers)
      .register(corePlugin)
    return server
  } catch (error) {
    throw createError('CREATE_SERVER_ERROR', error)
  }
}

/**
 * Start server
 * @param server
 */
export async function start (server: FastifyInstance): Promise<void> {
  await server.ready()
  const configuration = config
  const host = configuration.app.host ? configuration.app.host : '0.0.0.0'
  const port = configuration.app.port ? configuration.app.port : 3000
  server.listen(port, host, (error: Error) => {
    console.info(configuration)
    console.info('Loading all modules finished')
    console.info(`Server running on ${host}:${port}`)
    if (error) {
      createError('START_SERVER_ERROR', error)
      process.exit(1)
    }
  })
}
