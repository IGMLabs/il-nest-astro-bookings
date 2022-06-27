import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Query } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("")
  public getHello(): string {
    return this.appService.getHello();
  }

  @Get("/test")
  public getTest():string{
    return "Hola Test";
  }

  @Get("/param/:id")
  public getParam(@Param("id") id : string):string{
    const type = typeof id;
    return `Param: ${id} of type ${type}`;
  }

  @Get("/square/:someParam")
  public getSquare(@Param("someParam") someParam : number):string{
    const type = typeof someParam;
    const square = someParam*someParam;
    return `Square of: ${square} of type ${type}`;
  }

  @Get("/square/Nan/:someParam")
  public getSquareNan(@Param("someParam") someParam : number):string{
    const someNumber = parseInt(someParam.toString());
    if (isNaN(someNumber)) throw new HttpException(`${someParam} is not a number`, HttpStatus.BAD_REQUEST);
    const type = typeof someNumber;
    const square = someNumber*someNumber;
    return `Square of: ${square} of type ${type}`;
  }

  @Get("/square/pipe/:someParam")
  public getSquarePipe(@Param("someParam",ParseIntPipe) someNumber : number):string{
    const type = typeof someNumber;
    const square = someNumber*someNumber;
    return `Square of: ${square} of type ${type}`;
  }

  @Get("/multiply/:someNumber/:otherNumber")
  public getMultiply(
    @Param("someNumber",ParseIntPipe) someNumber : number,
    @Param("otherNumber",ParseIntPipe) otherNumber : number,
  ):number{
    const multiply = someNumber*otherNumber;
    return multiply;
  }

  @Get("/multiply/query")
  public getMultiplyQuery(
    @Query("a",ParseIntPipe) a : number,
    @Query("b",ParseIntPipe) b : number,
  ):number{
    const multiply = a*b;
    return multiply;
  }

  @Get("/divide/query")
  public getDivideQuery(
    @Query("a",ParseIntPipe) a : number,
    @Query("b",ParseIntPipe) b : number,
  ):number{
    try {
      return this.appService.divide(a,b);
    }catch(error){
      throw new HttpException (error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get("/raiz/query")
  public getRaizQuery(
    @Query("a",ParseIntPipe) a : number,
  ):number{
    try {
    return this.appService.raiz(a);
    }catch(error){
      throw new HttpException (error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
