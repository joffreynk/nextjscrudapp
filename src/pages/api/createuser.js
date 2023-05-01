import mysql from 'mysql2';


export default function createUser(req, res) {

    // create the pool
    const connection = mysql.createConnection({
      host:'localhost',
      user: 'root',
      database: 'practice',
    });
    const addUser = 'INSERT INTO users (userName, lastName, firstName, email) VALUES(?, ?, ?, ?)';
    const [userName, lastName, firstName, email] = req.body
    connection.query(addUser, [userName, lastName, firstName, email], (error, result) => {
      if(error) return res.status(401).json({ error: error.message})
      console.log(result);
      res.status(201).json({ result: 'user created successfully'})
    })
}
