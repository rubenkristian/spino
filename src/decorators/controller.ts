/**
 * reference https://javascript.plainenglish.io/how-to-write-simple-router-decorators-for-expressjs-with-typescript-3b8340b4d453
 */
import { Reflect } from "https://deno.land/x/reflect_metadata@v0.1.12-2/mod.ts";
import { MetadataKeys } from "./meta.ts";

const Controller = (name: string) => {
  return (target: any) => {
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, name, target);
  }
};

export default Controller;