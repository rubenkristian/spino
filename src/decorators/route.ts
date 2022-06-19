/**
 * reference https://javascript.plainenglish.io/how-to-write-simple-router-decorators-for-expressjs-with-typescript-3b8340b4d453
 */
import { Reflect } from "https://deno.land/x/reflect_metadata@v0.1.12-2/mod.ts";
import { MetadataKeys } from "./meta.ts";
export enum Methods {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PUT = 'put',
  OPTIONS = 'options',
}

export interface IRouter {
  method: Methods;
  path: string;
  handlerName: string | symbol;
}

export const methodDecoratorFactory = (method: Methods) => {
  return (name: string) => {
    return (target: any, member: string) => {
      const controllerClass = target.constructor;

      const routers: IRouter[] = Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass) ? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass) : [];

      routers.push({
        method,
        path: name,
        handlerName: member
      });

      Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass);
    }
  }
}

export const Get = methodDecoratorFactory(Methods.GET);
export const Post = methodDecoratorFactory(Methods.POST);
export const Delete = methodDecoratorFactory(Methods.DELETE);
export const Put = methodDecoratorFactory(Methods.PUT);
export const Options = methodDecoratorFactory(Methods.OPTIONS);