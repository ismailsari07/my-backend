import express, { Request, Response } from 'express';

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


interface User {
    id: number,
    name: string, 
    email: string
}

let users: User[] = [
    {
        id: 1,
        name: "ismail",
        email: "xismail.sari@gmail.com"
    },
    {
        id: 2,
        name: "Ismail",
        email: "xismail.sari@gmail.com"
    }
];

app.get('/', async (req: Request, res: Response) => {
    //res.set('Access-Control-Allow-Origin', '*');
    //res.send("Hello from backend");
})

// Get all users
app.get('/GetUsers', async (req: Request, res: Response) => {
    // res.set('Access-Control-Allow-Origin', '*');
    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
        console.log(result.rows)
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
  });
  
// Add a new user
app.post('/setUser', (req: Request, res: Response) => {
    const { name, email } = req.body;
    const newUser: User = { id: users.length + 1, name, email };
    users.push(newUser);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
    res.status(201).json(newUser);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
