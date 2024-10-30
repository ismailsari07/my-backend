import express, { Request, Response } from 'express';
import {User} from "./model";

const cors = require('cors');
const app = express();
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
     const { isThereUser, userName, country, phoneNumber, email, password } = req.body;

    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Max-Age", "1800");
    // res.setHeader("Access-Control-Allow-Headers", "content-type");
    // res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");

    try {
        const result = await db.query(`INSERT INTO users (username, email, password_hash, phone_number, country, last_login)
        VALUES ('${userName}', '${email}', '${password}', '${phoneNumber}', '${country}', current_timestamp);`);
        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }

      //res.status(201).json({message: "good job, you did it!"});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
