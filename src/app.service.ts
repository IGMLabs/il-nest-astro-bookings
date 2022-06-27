import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }
  public multiply(somenumber:number, otherNumber:number): number {
    const multiply = somenumber * otherNumber;
    return multiply;
  }

  public divide(somenumber:number, otherNumber:number): number {
    if (otherNumber!==0){
    const divide = somenumber / otherNumber;
    return divide;
    }else{
      throw new Error(`${otherNumber} is no valid`);
    }
  }

  public raiz(somenumber:number): number {
    if (somenumber>=0){
    const raiz = Math.sqrt(somenumber);
    return raiz;
    }else{
      throw new Error(`${somenumber} is negative number`);
    }
  }
}

