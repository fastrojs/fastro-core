import {
  RawServerBase,
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyLoggerOptions,
  FastifyInstance,
  FastifyServerOptions,
  FastifyError,
  FastifyReply,
  ContextConfigDefault
} from 'fastify'

declare module 'fastify' {
  export interface FastifyInstance<
    RawServer extends RawServerBase = RawServerDefault,
    RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
    RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
    Logger = FastifyLoggerOptions<RawServer>
  > {
      /** Some support decorator */
      someSupport(): string;
    }

  // https://www.fastify.io/docs/latest/TypeScript/#request
  // https://www.fastify.io/docs/latest/TypeScript/#reply
  export interface FastifyReplyInterface<
    RawServer extends RawServerBase = RawServerDefault,
    RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
    ContextConfig = ContextConfigDefault
  > {
    // you must reference the interface and not the type
    ok<T>(this: FastifyReplyInterface, payload?: T): FastifyReply<RawServer, RawReply>;
    error(this: FastifyReplyInterface, error: FastifyError): FastifyReply<RawServer, RawReply>;
  }
}

type config = {
  app: {
    port: number;
    host: string;
  };
}

type HookName = 'onRequest' | 'onResponse' | 'preParsing' | 'preValidation' | 'preHandler' | 'preSerialization'
export declare function GatewayHook(hook: HookName): Function
export declare function Hook(hook: HookName): Function
export declare function Get(options?: any): Function
export declare function Post(options?: any): Function
export declare function Delete(options?: any): Function
export declare function Head(options?: any): Function
export declare function Patch(options?: any): Function
export declare function Put(options?: any): Function
export declare function Options(options?: any): Function

export declare function Gateway(options?: any): Function
export declare function Controller(options?: any): Function
export declare function Service(): Function
export declare function InjectController(controller: Function): any
export declare function InjectService(service: Function): any
export declare function createServer(fastifyOpts?: FastifyServerOptions): Promise<FastifyInstance>
export declare function start(server: FastifyInstance): Promise<void>
export declare function createError(name: string, error: Error): Error
export declare function loader (): Promise<void>
export declare function getSourceDir (): string

export declare const gatewayControllerContainer: any[]
export declare const gatewayContainer: Map<string | symbol | Object, any>
export declare const gatewayHookContainer: any[]
export declare const controllerContainer: Map<string | symbol | Object, any>
export declare const serviceContainer: Map<string | symbol | Object, any>
export declare const methodContainer: any[]
export declare const hookContainer: any[]
export declare const pluginContainer: any[]
export declare const token: Symbol
export declare const configuration: config
