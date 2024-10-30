const { Pool } = require('pg');

let errorMessage: string = `
***************************************
* ❌ DATABASE CONNECTION FAILED ❌ *
***************************************
* 🛑 Status: OFFLINE                  *
* ⚠️  Error: Unable to establish a connection *
* 📅 Timestamp: ${new Date().toLocaleString()} *
* 🔄 Please check your configuration and try again! *
***************************************`;
let connectedMessage: string = `
***************************************
* 🚀 Database Connection: SUCCESSFUL 🚀 *
***************************************
* 💾 Status: Connected and Ready       *
* ⏰ Time: ${new Date().toLocaleString()} *
* 🎉 Let's get to work!                *
***************************************`;

const pool = new Pool({
  user: 'postgres',
  password: 'deneme',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'postgres'
});

pool.connect((err: any) => {
    if (err)
        console.error('\u001b[1;31m ' + errorMessage)
    else 
        console.log('\u001b[1;32m ' + connectedMessage)
})

module.exports = {
    query: (text:any, params:any) => pool.query(text, params)
};