export class FetchRequest {
  private _header: Headers;
  private _contentType: string;
  private _query;
  constructor(private readonly req: Request) {
    this._query = new URL(this.req.url);
    console.log(this._query);
    this._header = req.headers;
    this._contentType = (this._header.get('content-type')?.split(";") as Array<string>)[0];
  }

  public async body() {
    if (this._contentType === 'multipart/form-data') {
      return await this.req.blob();
    } else if (this._contentType === 'multipart/json') {
      return await this.req.json();
    } else {
      return await this.req.text();
    }
  }

  get contentType() {
    return this._contentType;
  }

  get header() {
    return this._header;
  }

  getParams(name: string) {
    return this._query.searchParams.get(name);
  }

  get path() {
    const paths = this._query.pathname.split('/');
    return paths.slice(1, paths.length);
  }
}