import fastify, { FastifyInstance, ServerOptions } from 'fastify'
import { loader } from './loader'
import { configuration as config } from './configuration'
import { createError } from './error'
import { corePlugin } from './coreplugin'
import {
  createPlugins,
  createControllers,
  createGateways
} from './module.creator'

export const createServer = async (options?: ServerOptions): Promise<FastifyInstance> => {
  try {
    await loader() // load all service & controller classes for dependency injection
    let server = fastify(options)
    server = await createPlugins(server)
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
export const start = async (server: FastifyInstance): Promise<void> => {
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
