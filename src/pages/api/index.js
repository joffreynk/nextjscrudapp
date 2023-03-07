// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mysql = require('mysql2/promise');


export default async function handler(req, res) {

  console.log(req);

    // create the pool
    const conection = await mysql.createConnection({
      host:'localhost',
      user: 'root',
      database: 'nextjscrudapp',
      // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
    });

    try {
      const query = 'select * from users'
      const [data] = await conection.execute(query, []);
      conection.end();
      res.status(200).json({results: data});  
    } catch (error) {
      
      res.status(500).json({error: error.message});
    }

}
