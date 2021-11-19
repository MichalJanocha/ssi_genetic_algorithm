import { Runtime } from "../base/runtime-class";
import { Generator } from "../generator/generator";

export class Selection implements Runtime {
  populationValues = new Map();
  decPopVals: number[][] = [];
  decPopProbs: number[][] = [];
  equationSum: number = 0;
  newRandomPop: number[] = [];
  finalPopulation: string[] = [];

  run(population: string[], e: (ent: number, a: number, b: number, c: number) => number, a: number, b: number, c: number){
    this.equationSum = 0;
    this.decPopVals = population
      .map(ent => Generator.decode(ent))
      .map(dec => {
        let equation = e(dec, a, b, c);
        if(equation < 0){
          equation = 0;
        }
        return [dec, equation]
      })
    this.decPopVals.forEach(([dec1, eq1]) => this.equationSum += eq1);
    this.decPopProbs = this.decPopVals.map(([decValue, eq]) => [decValue, eq/this.equationSum]).sort((a,b) => a[1] - b[1]);
    const ranges = this.decPopProbs.map(([decValue, prob], i, a) => {
      if(i === 0){
        return [0, prob, decValue];
      }else{
        if(a[i+1] !== undefined){
          return [a[i-1][1], a[i][1], decValue];
        }else{
          return [a[i-1][1], 1, decValue];
        }
      }
    })

    for(let i=0; i<population.length; i++){
      const rnd = Math.random();
      const rang = ranges.find(([down, upper, dec]) => rnd > down && rnd <= upper);
      if(rang !== undefined){
        this.newRandomPop.push(rang[2]);
      }else{
        throw new Error('Wystapil blad podczas selekcji, nie znaleziono zakresu dla liczby pseudo losowej');
      }
    }
    return this.newRandomPop.map(dec => Generator.encode(dec));
  }


}