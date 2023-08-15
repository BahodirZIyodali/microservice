import { Controller, HttpCode, HttpStatus, Body, Post, Patch, Get, ParseUUIDPipe, Param, Query } from "@nestjs/common";
import { UserService } from "@clients";
import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
} from "@nestjs/swagger";
import {
  SignInDto,
  SignInResponseDto,
  SignOutDto,
  SignUpDto,
  SignUpResponseDto,
} from "./dtos";
import type { SignUpRequest, SignInRequest } from "@clients";
import { SignOutRequest } from "clients/user/interfaces";
import { UserUpdateDto } from "./dtos/user-update.dto";
import { UserRetriveAllDto } from "./dtos/user-all.dto";

@ApiTags("Auth")
@Controller({
  path: "user-service",
  version: "1",
})
export class AuthController {
  readonly #_service: UserService;

  constructor(service: UserService) {
    this.#_service = service;
  }

  @HttpCode(HttpStatus.OK)
  @Post("sign-up")
  @ApiBody({ type: SignUpDto })
  @ApiOkResponse({ type: SignUpResponseDto })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiBadRequestResponse({ description: "Bad request" })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  signUp(@Body() body: SignUpRequest) {
    return this.#_service.signUp(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({ type: SignInResponseDto })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiBadRequestResponse({ description: "Bad request" })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  signIn(@Body() body: SignInRequest) {
    return this.#_service.signIn(body);
  }

  
  @HttpCode(HttpStatus.OK)
  @Post("sign-out")
  @ApiBody({ type: SignOutDto })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiBadRequestResponse({ description: "Bad request" })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  signOut(@Body() body: SignOutRequest):Promise<null> {
    return this.#_service.signOut(body);
  }

  @HttpCode(HttpStatus.OK)
  @Get("users")
  categoryRetriveAll(
      @Query() query:UserRetriveAllDto
  ):object{
      return this.#_service.UserRetriveAll(query)
  }
  

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('update-user/:id')
  async updateCategory(
      @Param('id', ParseUUIDPipe) id:string ,
      @Body() body:UserUpdateDto
  ):Promise<UserUpdateDto>{
      return await this.#_service.userUpdate({
          ...body,    
          id  
      })              
  } 

  @HttpCode(HttpStatus.OK)
  @Get('get-order/:id')
  async getCategory(
      @Param('id', ParseUUIDPipe) id:string ,
  ):Promise<object>{              
      return await this.#_service.userGetOrder({id})              
  }
}
