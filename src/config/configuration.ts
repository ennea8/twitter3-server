export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    DATABASE_URL: process.env.DATABASE_URL,
    // host: process.env.DATABASE_HOST,
    // port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});
