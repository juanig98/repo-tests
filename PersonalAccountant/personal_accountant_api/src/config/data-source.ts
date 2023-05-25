import { DataSource } from "typeorm"

export const dataSourceConnection = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 27017,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ["src/models/**.entity.ts"],
    logging: true,
    synchronize: false,
})