import fs from 'fs'
import { connection } from './connection';

export default function deleteuser(req, res) {
    try {
        const {userId, filepath} = req.body
        if(fs.existsSync(filepath)) fs.unlinkSync(filepath)
        const sql = 'DELETE FROM users WHERE id = ?'

        connection.query(sql, [userId], (error, result)=>{
            if(error) res.status(401).json({message: error.message})
            console.log(result);
            res.status(201).json({message: 'USER DELETED SUCCESSFULLY'})
        })
    } catch (error) {
        res.status(401).json({message: 'user deletion failed'})
    }
}