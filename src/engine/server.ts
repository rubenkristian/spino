import { FetchRequest } from "./fetch_request.ts";

export class ServerEngine {
  private async serve({conn}: {conn: Deno.Conn}) {
    const httpConn = Deno.serveHttp(conn);

    for await (const req of httpConn) {
      const fetchReq = new FetchRequest(req.request);
      console.log(fetchReq.path)
      req.respondWith(new Response("Hello"));
    }
  }

  public async start({port}: {port: number}) {
    const server = Deno.listen({port: port});

    for await (const conn of server) {
      this.serve({conn: conn});
    }
  }
}