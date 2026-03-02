const Sequelize = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const path = require('path');

const { DATABASE_URL } = require('./config');

const sequelize = new Sequelize(DATABASE_URL);

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: path.join(__dirname, '..', 'migrations', '*.js'),
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
  });

  const migrations = await migrator.up();

  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();

    console.log('database connected');
    console.log('running migrations...');

    await runMigrations();
  } catch (err) {
    console.log('connecting database failed');

    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize };
