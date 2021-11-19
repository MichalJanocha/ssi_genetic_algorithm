import { Runtime } from "../base/runtime-class";

export class Cross implements Runtime {
  entitiesCount!: number;
  pairs: string[][] = [];
  notModifiedPopulations!: string[];
  outputPopulations: string[] = [];

  run(populations: string[], crossProbability: number): string[] {
    this.notModifiedPopulations = populations;
    this.findEntitiesCount();
    this.divideIntoPairs();
    this.pairs.forEach(pair => {
      if(this.checkIfPairShouldCross(crossProbability)){
        const cutPoint = this.findCutPoint(pair[0]);
        let p1e = pair[0].substr(cutPoint);
        let p1s = pair[0].substr(0, cutPoint);
        let p2e = pair[1].substr(cutPoint);
        let p2s = pair[1].substr(0, cutPoint);
        Array.isArray(this.outputPopulations) ?
          this.outputPopulations.push(p2s+p1e, p1e+p2s) :
          this.outputPopulations = [p2s+p1e, p1s+p2e]
      }else{
        Array.isArray(this.outputPopulations) ?
          this.outputPopulations.push(...pair) :
          this.outputPopulations = pair;
      }
    })
    return this.outputPopulations;
  }
  
  private findCutPoint(parent: string): number {
    return (Math.round(Math.random() * (parent.length - 2)) + 1)
  }

  private checkIfPairShouldCross(crossProbability: number){
    return crossProbability > Math.random();
  }

  private findEntitiesCount() {
    this.entitiesCount = this.notModifiedPopulations.length;
  }

  private divideIntoPairs(){
    const tmpCol: string[] = JSON.parse(JSON.stringify(this.notModifiedPopulations));

    while(tmpCol.length > 1){
      const rIdx = Math.round(Math.random() * ((tmpCol.length-1) - 1) + 1);
      this.pairs.push([tmpCol.splice(rIdx, 1)[0], tmpCol.splice(0, 1)[0]]);
    }

    if(tmpCol.length === 1){
      this.outputPopulations.push(tmpCol[0]);
    }

  }
}