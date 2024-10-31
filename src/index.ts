import express, { Request, Response } from 'express';
import {Output, User} from "./model";

const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const db = require('./db');
const port = 3000;

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3001', // Allow only specific origin
    methods: 'GET,POST,PUT,DELETE',  // Specify the allowed methods
    credentials: true                // Allow cookies if needed
}));



app.get('/', async (req: Request, res: Response) => {
    //res.set('Access-Control-Allow-Origin', '*');
    //res.send("Hello from backend");
})

app.get('/GetUsers', async (req: Request, res: Response) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
  });
  
app.post('/SetUser', async (req: Request, res: Response) => {
    const { userName, country, phoneNumber, email, password } = req.body;
    let result: Output;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const resultQuery = await db.query(`INSERT INTO users (username, email, password, phone_number, country, last_login)
            VALUES ('${userName}', '${email}', '${hashedPassword}', '${phoneNumber}', '${country}', current_timestamp);`);

        result = {Response: {}, Status: resultQuery.rowCount === 1, Error: []};
        res.json(result);
      } catch (err) {
        result = {Response: {}, Status: false, Error: []};
        res.json(result);
        res.status(500).send('Internal Server Error');
      }
});

app.post('/Register', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    let result: Output;
    debugger;

    try {
        const resultQuery = await db.query(`SELECT PASSWORD FROM USERS WHERE EMAIL = '${email}';`)

        if (resultQuery.rowCount === 1) {
            const isMatch = await bcrypt.compare(password, resultQuery.rows[0].password);

            if (isMatch) {
                result = {Response: {}, Status: true, Error: []};
                res.json(result);
            }
            else {
                result = {Response: {}, Status: false, Error: [{ErrorCode: 493974, ErrorMessage: 'Email Or Password were wrong'}]};
                res.json(result);
            }
        }
        else {
            result = {Response: {}, Status: false, Error: [{ErrorCode: 493973, ErrorMessage: 'Email Or Password were wrong'}]};
            res.json(result);
        }
      } catch (err) {
        result = {Response: {}, Status: false, Error: [{ErrorCode: 404, ErrorMessage: 'SERVER ERROR'}]};
        res.json(result);
        res.status(500).send('Internal Server Error');
      }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
