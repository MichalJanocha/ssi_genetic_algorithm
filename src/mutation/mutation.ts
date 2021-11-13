import { Runtime } from "../base/runtime-class";

export class Mutation implements Runtime {
  run(populations: string[], mutProbability: number){
    const newpop = populations.map(entity => {
      if(this.checkIfShouldMutate(mutProbability)){
        let tmp = '';
        for(let i=0; i<entity.length; i++){
          tmp += entity[i] === '0' ? '1' : '0';
        }
        return tmp;
      }else{
        return entity;
      }
    })
    return newpop;
  }

  private checkIfShouldMutate(mutProbability: number){
    return mutProbability > Math.random();
  }
}