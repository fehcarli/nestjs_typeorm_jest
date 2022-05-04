import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
    type: "postgres",
    host: "localhost", //o endereço de hospedagem do host
    port: 5432, //url do serviço de banco aqui
    username: "postgres", //nome do serviço a ser utilizado
    password: "postgres", //hash da senha do serviço 
    database: "jest-server", //o nome banco de dados como aparece no serviço elephantSQL
    synchronize: false,
    migrationsRun: true,
    migrationsTableName: "MigrationHistory",
    entities: ["src/todo/entity/*.ts"],
    migrations: ["src/todo/migrations/**"],    
    cli: {
        entitiesDir: "src/todo/entity",
        migrationsDir: "src/todo/migrations"
    }
}

export = config;