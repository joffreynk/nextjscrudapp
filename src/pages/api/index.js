import mysql from 'mysql2';


export default function handler(req, res) {
  console.log(req.body);

    // create the pool
    const connection = mysql.createConnection({
      host:'localhost',
      user: 'root',
      database: 'practice',
    });

    if (req.body){
      const addUser = 'INSERT INTO users (userName, lastName, firstName, email) VALUES(?, ?, ?, ?)';
      const [userName, lastName, firstName, email] = req.body
      connection.query(addUser, [userName, lastName, firstName, email], (error, result) => {
      })
    }
    const sql = 'select * from users';

    connection.query(sql, (err, data)=>{
      if (err) return res.status(401).json({ error: "OOOps failed to create connection"});
      res.status(200).json(data);
    })

}
