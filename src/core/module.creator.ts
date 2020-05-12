import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { pluginsLoader } from './loader'
import {
  controllerContainer,
  gatewayContainer,
  gatewayControllerContainer,
  gatewayHookContainer
} from './container'
import { createError } from './error'

interface Controller {
  instance: any;
  options: any;
  methodList: any[];
  hookList: any[];
  hookOptions: any;
}

export const createPlugins = async (server: FastifyInstance): Promise<any> => {
  try {
    const plugins = await pluginsLoader()
    plugins.map(item => {
      server.register(fp(item.plugin))
    })
    return server
  } catch (error) {
    throw createError('CREATE_PLUGINS_ERROR', error)
  }
}

const createRoutes = (controller: Controller): any => {
  const { instance, methodList, hookOptions } = controller
  return (fastify: FastifyInstance, opts: any, next: Function): void => {
    try {
      methodList.map(controllerMethod => {
        const { functionName, options } = controllerMethod
        const handler: any = async (...args: any) => instance[functionName](...args)
        const routeOptions = { ...options, handler }
        if (hookOptions) {
          const routeOptions = { ...options, handler }
          fastify.route({ ...routeOptions, ...hookOptions })
        } else fastify.route(routeOptions)
      })
      methodList.length = 0
      next()
    } catch (error) {
      throw createError('CREATE_ROUTES_ERROR', error)
    }
  }
}

const initHooks = (controller: Controller): Controller => {
  try {
    const { instance, hookList } = controller
    let hookOptions: any
    if (hookList.length > 0) {
      hookList.map(item => {
        const { hookFnName, hook } = item
        const hookHandler: any = async (...args: any) => instance[hookFnName](...args)
        hookOptions = { ...{}, [hook]: hookHandler }
      })
      controller.hookOptions = hookOptions
    }
    hookList.length = 0
    return controller
  } catch (error) {
    throw createError('INIT_HOOKS_ERROR', error)
  }
}

const createHooks = (controller: Controller): any => {
  const ctrl = initHooks(controller)
  return createRoutes(ctrl)
}

export const createControllers = (): any => {
  return (fastify: FastifyInstance, opts: any, next: Function): void => {
    try {
      controllerContainer.forEach(controller => {
        const registeredController =
          gatewayControllerContainer
            .filter(item => item.controller.controllerName === controller.controllerName)
        // skip registered controller on route creation
        if (registeredController.length > 0) return

        const routeList = createHooks(controller)
        fastify.register(routeList, controller.options)
      })
      controllerContainer.clear()
      next()
    } catch (error) {
      throw createError('CREATE_CONTROLLER_ERROR', error)
    }
  }
}

const createGatewayRoutes = (controller: Controller): any => {
  try {
    const { instance, methodList } = controller
    // clone array to prevent mutation on route creation
    const clonedMethodList = [...methodList]
    return (fastify: FastifyInstance, opts: any, next: Function): void => {
      clonedMethodList.map(controllerMethod => {
        const { functionName, options } = controllerMethod
        // clone object to prevent mutation on route creation
        const clonedOptions = { ...options }
        const handler: any = async (...args: any) => instance[functionName](...args)
        const routeOptions = { ...clonedOptions, handler }
        fastify.route(routeOptions)
      })
      next()
    }
  } catch (error) {
    throw createError('CREATE_GATEWAY_ROUTES_ERROR', error)
  }
}

const createGatewayControllerHooks = (controller: Controller): any => {
  const ctrl = initHooks(controller)
  return createGatewayRoutes(ctrl)
}

const createGatewayControllers = (container: any[]): any => {
  const mappedControllers = container.map(controller => controller.controller)
  return (fastify: FastifyInstance, opts: any, next: Function): void => {
    try {
      mappedControllers.forEach(controller => {
        const routeList = createGatewayControllerHooks(controller)
        fastify.register(routeList, controller.options)
      })
      next()
    } catch (error) {
      throw createError('CREATE_GATEWAY_CONTROLLER_ERROR', error)
    }
  }
}

const createGatewayHooks = (gatewayObject: any): any => {
  const { instance, hookList, controllerContainer } = gatewayObject
  return (fastify: FastifyInstance, opts: any, next: Function): void => {
    try {
      if (hookList.length > 0) {
        hookList.map(item => {
          const { hookFnName, hook } = item
          const hookHandler: any = (...args: any) => instance[hookFnName](...args)
          fastify.addHook(hook, hookHandler)
        })
      }
      const controller = createGatewayControllers(controllerContainer)
      fastify.register(controller)
      next()
    } catch (error) {
      throw createError('CREATE_GATEWAY_HOOK_ERROR', error)
    }
  }
}

export const createGateways = (): any => {
  return (fastify: FastifyInstance, opts: any, next: Function): void => {
    try {
      gatewayContainer.forEach(gateway => {
        const hookList = gatewayHookContainer.filter(hook => hook.className === gateway.gatewayName)
        const controllerContainer = gatewayControllerContainer.filter(controller => controller.className === gateway.gatewayName)
        const controller = createGatewayHooks({ hookList, instance: gateway.instance, controllerContainer })
        fastify.register(controller, gateway.options)
      })
      gatewayHookContainer.length = 0
      gatewayContainer.clear()
      next()
    } catch (error) {
      throw createError('CREATE_GATEWAYS_ERROR', error)
    }
  }
}
