const env = require("dotenv")

env.config()
module.exports = {
    database: {
        host: process.env.DB_SQL_HOST,
        user: process.env.DB_SQL_USER,
        password: process.env.DB_SQL_PASSWORD,
        database: process.env.DB_SQL_DATABASE
    }
}