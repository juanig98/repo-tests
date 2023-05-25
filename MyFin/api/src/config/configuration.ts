export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 1433,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ['src/models/*.ts', './dist/models/**/*.js'],
    synchronize: true,
  },
  jwt: {
    secret: process.env.SECRET_KEY,
  }
});
