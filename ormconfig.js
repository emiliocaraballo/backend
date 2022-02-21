module.exports = {
    "type": process.env.BD_DRIVE,
    "host":  process.env.DB_HOST,
    "port": process.env.BD_PORT,
    "username": process.env.BD_USER,
    "password": process.env.BD_PASS,
    "database": process.env.BD_NAME,
    "entities": ["src/database/entity/*.ts"],
    "migrationsTableName": "custom_migration_table",
    "migrations": ["src/database/migration/*.ts"],
    "seeds": ["src/database/seeds/**/*.ts"],
    "cli": {
      "migrationsDir": "src/database/migration"
    },
    "logging": false,
    "synchronize": false
 }