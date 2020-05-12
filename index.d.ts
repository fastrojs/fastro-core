import * as http from 'http'
import fastify, { FastifyInstance } from 'fastify'

declare module 'fastify' {
  export interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse
    > {
    someSupport(): string;
  }

  interface RouteOptions<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse,
    Query = DefaultQuery,
    Params = DefaultParams,
    Headers = DefaultHeaders,
    Body = DefaultBody
  > extends RouteShorthandOptions<HttpServer, HttpRequest, HttpResponse, Query, Params, Headers, Body> {
    method: HTTPMethod | HTTPMethod[];
    url: string;
    schema?: RouteSchema;
    handler: RequestHandler<HttpRequest, HttpResponse, Query, Params, Headers, Body>;
  }

  interface FastifyInstance<HttpServer = http.Server, HttpRequest = http.IncomingMessage, HttpResponse = http.ServerResponse> {
    addHook (name: 'onRegister', hook: (instance: FastifyInstance, opts: any) => void): FastifyInstance<HttpServer, HttpRequest, HttpResponse>;
  }

  interface FastifyReply<HttpResponse>{
    sendOk<T>(this: FastifyReply<HttpResponse>, payload?: T, message?: string, statusCode?: number): void;
    sendError(this: FastifyReply<HttpResponse>, error: FastifyError): void;
  }
}

export type config = {
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
export declare function createServer(fastifyOpts?: fastify.ServerOptions): Promise<FastifyInstance>
export declare function start(server: FastifyInstance): Promise<void>
export declare function createError(name: string, error: Error): Error
export declare function loader (): Promise<void>

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
