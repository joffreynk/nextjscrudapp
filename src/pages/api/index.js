// import Connection from 'mysql2/typings/mysql/lib/Connection';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mysql from 'mysql2';


export default function handler(req, res) {

    // create the pool
    const connection = mysql.createConnection({
      host:'localhost',
      user: 'root',
      database: 'practice',
    });
    const sql = 'select * from users'

    console.log(`===============   ${__dirname} ${res.host}   ==============`);

    connection.query(sql, (err, data)=>{
      if (err) return res.status(401).json({ error: "OOOps failed to create connection"});
      res.status(200).json(data);
    })

}
