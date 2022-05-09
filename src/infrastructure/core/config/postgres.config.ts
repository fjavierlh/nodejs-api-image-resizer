import { Sequelize } from 'sequelize';

const USER = process.env.POSTGRES_USER ?? 'pguser';
const PASSWORD = process.env.POSTGRES_PASSWORD ?? 'pguser';
const HOST = process.env.POSTGRES_HOST ?? 'localhost';
const PORT = process.env.POSTGRES_PORT ?? '5432';
const DB_NAME = process.env.POSTGRES_DB ?? 'pgdb';

const sequelize = new Sequelize(
  `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}`,
  { logging: false }
);

const connectDB = async (): Promise<void> => {
  await sequelize
    .authenticate()
    .then(() => console.log('✅ Authenticate and connection success'))
    .catch((err) => console.log(err));

  await sequelize
    .sync({ force: true })
    .then(() => console.log('✅ Databases and tables created'))
    .catch((err) => console.log(err));
};

export default sequelize;

export { connectDB };
