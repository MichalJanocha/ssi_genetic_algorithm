import { Runner } from "./src/base/runtime";
import { Cross } from "./src/cross/cross";
import { Generator } from "./src/generator/generator";
import { Mutation } from "./src/mutation/mutation";
import { Selection } from "./src/selection/selection";
var fs = require('fs');


const main = (
    a: number,
    b: number,
    c: number,
    ile_wyn: number,
    lb_pop: number,
    ile_os: number,
    pr_krzyz: number,
    pr_mut: number
  ) => {

    const CUR_ENTITIES = lb_pop * ile_os;
    const MAX_ENTITIES = 150;
    if(CUR_ENTITIES > MAX_ENTITIES){ throw new Error('Calkowita liczba osobnikow przekracza 150') };

    const DWN_RNG = 0;
    const UPP_RNG = 255;
    const equation = (e: number, _a: number, _b: number, _c: number): number => {
      return _a * Math.pow(e, 2) + _b * e + _c * e;
    };

    for(let i=ile_wyn;i > 0; i--){
    let populations: string[] = [];
    populations = Runner.run(Generator, DWN_RNG, UPP_RNG, ile_os);

    for(let idx = 0; idx < lb_pop; idx++){
      populations = Runner.run(Cross, populations, pr_krzyz);
      populations = Runner.run(Mutation, populations, pr_mut);
      populations = Runner.run(Selection, populations, equation, a, b, c)
      // console.log(`Populacja ${idx+1}: ${populations}`)
    }
    const decodedPop = populations.map(x => Generator.decode(x)).sort((a,b) => b-a);
    fs.appendFile('results.csv', `f(${decodedPop[0]}) = ${equation(decodedPop[0], a, b, c)}\r\n`, () => {});
  }
}
main(4, 7, 2, 100, 17, 8, 0.8, 0.1);