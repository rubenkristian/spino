import { ServerEngine } from '../src/engine/server.ts';

const server = new ServerEngine();

await server.start({port: 8080});