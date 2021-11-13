export class Configuration {
  private _MAX_ENTITIES: number;

  public set MAX_ENTITIES(x: number){
    this._MAX_ENTITIES = x;
  };

  public get MAX_ENTITIES() {
    return this._MAX_ENTITIES;
  }
}