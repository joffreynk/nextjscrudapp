// import {connection} from "./connection.js";


export default function createUser(req, res) {


  console.log(req);
    // const addUser = 'INSERT INTO users (userName, lastName, firstName, email) VALUES(?, ?, ?, ?)';
    // const {userName, lastName, firstName, email} = req.body

    // connection.query(addUser, [userName, lastName, firstName, email], (error, data) => {
    //   if(error) return res.status(401).json({ error: error.message})
    //   return res.status(200).json({ result: 'user created successfully'})
    // })
}
