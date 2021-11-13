import { Runtime } from "../base/runtime-class";

export class Generator implements Runtime {
  min!: number;
  max!: number;
  strSizeVal!: number;
  populations: string[] = [];

  run(min: number, max: number, entCount: number) {
    this.max = max;
    this.min = min;
    this.strSize(max);
    this.generatePopulation(entCount);
    return this.populations;
  }

  static decode(entity: string){
    return parseInt(entity, 2);
  }

  static encode(entity: number){
    return entity.toString(2).padStart(8, '0');
  }

  private strSize(max: number): void {
    this.strSizeVal = Number(max).toString(2).length;
  }

  private generateEntity(): string {
    return (Math.round(Math.random()*this.max)).toString(2).padStart(this.strSizeVal, '0');
  }

  private generatePopulation(entCount: number) {
    for(let k=0; k<entCount; k++){
      this.populations.push(this.generateEntity());
    }
  }
}