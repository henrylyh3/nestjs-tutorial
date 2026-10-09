# nestjs-tutorial

NestJS(.net framework) is a backend framework that runs on Node.js(.net runtime) and using js/ts (c#)

# notes

Typescript is just javascript with type annotation ()

ts:const logTodo = (id: number, title: string, completed: boolean) => {
js: const logTodo = (id, title, completed) => {

app.module == program.cs

folder
-> controller
-> service
-> module

decorator: @Module -> @Controller -> @Injectable(Service) -> @Entity

controller decorator -> @Post, @Body, @Param @Patch @Delete @Get, @UseInterceptors @ClassSerializerInterceptor @Session @UseGuards
service decorator -> @Injectable -> @InjectRepository
dto decorator -> @IsEmail @IsString @MinLength @IsOptional
entity decorator -> @PrimaryGeneratedColumn -> @Column , hooks decorator (@AfterInsert, @AfterRemove, @AfterUpdate, @Exclude)

new item -> item.module (setup) -> app.module (setup)

Encryption
using salt and hash

- salt random number and hash acoording the the salt
- save salt and result
- verify using the saved salt and has the input and compare result

Interceptor (middleware)
intercept incoming and outgoing request

commands
nest new . -> initiate new nest project
nest g controller user -> create new user controller in its folder
nest g module user -> create new user module in its folder
nest g service user -> create new user service in its folder
npm run start:dev -> start and watch
npm install class-validator class-transformer
