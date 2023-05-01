import {connection} from "./connection.js";
import mysql from 'mysql2';


export default function handler(req, res) {
    const sql = 'select * from users';

    connection.query(sql, (err, data)=>{
      if (err) return res.status(401).json({ error: "OOOps failed to create connection"});
      res.status(200).json(data);
    })

}
