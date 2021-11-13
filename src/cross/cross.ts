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
    let pairsCount = 0;

    while(pairsCount < this.notModifiedPopulations.length){
      this.pairs.push([
        this.notModifiedPopulations[Math.round(Math.random() * (this.entitiesCount-1))],
        this.notModifiedPopulations[Math.round(Math.random() * (this.entitiesCount-1))]
      ])
      pairsCount = 0;
      this.pairs.forEach(x => pairsCount += x.length);
    }
  }
}