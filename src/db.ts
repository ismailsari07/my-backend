const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'deneme',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'postgres'
});
pool.connect((err: any) => {
    if (err)
        console.error("fail" + err)
    else 
        console.log("connecctted")
})

module.exports = {
    query: (text:any, params:any) => pool.query(text, params)
  };