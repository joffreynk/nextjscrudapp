import fs from 'fs'
import { connection } from './connection';

export default function deleteuser(req, res) {
    const {id, filepath} = req.body
    try {
        console.log(req.body);
        if(fs.existsSync(filepath)) fs.unlinkSync(filepath)
        const sql = 'delete from users where id = ?'

        connection.query(sql, [id], (error, result)=>{
            if(error) res.status(401).json({message: error.message})
            
            res.status(201).json({message: 'USER DELETED SUCCESSFULLY'})
        })
    } catch (error) {
        res.status(401).json({message: 'user deletion failed'})
    }
}