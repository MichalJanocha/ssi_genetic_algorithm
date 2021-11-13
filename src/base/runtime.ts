import { Runtime } from "./runtime-class";

export class Runner {
  static run<X, T extends Runtime>(className: new () => T, ...args: any): X {
    return new className().run(...args) as X;
  }
}