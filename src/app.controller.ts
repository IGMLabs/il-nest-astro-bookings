import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { AppService } from "./app.service";
import { Client } from "./client.interface";

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

  @Post("/raiz")
  public getRaizQueryPost(
    @Query("a",ParseIntPipe) a : number,
  ):number{
    try {
    return this.appService.raiz(a);
    }catch(error){
      throw new HttpException (error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post("")
  public postHelloPost(@Body() name: string): string {
    const type = typeof name;
    const nameString = JSON.stringify(name)
    return `Body ${name} of type: ${type}; ${nameString}`;
  }

  @Post("name")
  public postHelloName(@Body() name: {name :string}): string {
    return `Hello ${name.name}`;
  }

  @Post("/client")
  public postClient(@Body() payload: Client): Client {
    return this.appService.saveClient(payload);
  }

  @Put("/client/:id")
  public putClient(@Param("id") clientId: string, @Body() payload: Client): Client {
    try{
      return this.appService.updateClient(clientId,payload);
    }catch (error){
      const message: string =error.message;
      if (message.startsWith("NOT FOUND:")) throw new HttpException(message, HttpStatus.NOT_FOUND) 
      else throw new HttpException(message,HttpStatus.BAD_REQUEST);
    }
  }
}
