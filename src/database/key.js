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
/*        Example file .env

PORT=5000
VERSION_API=v2.0
DB_SQL_USER=root
DB_SQL_PASSWORD=87654321
DB_SQL_HOST=localhost
DB_SQL_DATABASE=portfolio_db
DB_SQL_PORT=3306

 */
