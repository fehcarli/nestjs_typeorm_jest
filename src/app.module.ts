import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo/entity/todo.entity';
import { TodoModule } from './todo/todo.module';

@Module({
      imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: "localhost", //o endereço de hospedagem do host
        port: 5432, //url do serviço de banco aqui
        username: "postgres", //nome do serviço a ser utilizado
        password: "postgres", //hash da senha do serviço
        database: "jest-server",
        entities: [TodoEntity]
      }), TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
