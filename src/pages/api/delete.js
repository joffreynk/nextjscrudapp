import fs from 'fs'

export default function deleteuser(req, res) {
    const {id, filepath} = req.body
    try {
        console.log(req.body);
        fs.unlinkSync(filepath)
        res.status(201).json({message: 'USER DELETED SUCCESSFULLY'})
    } catch (error) {
        res.status(401).json({message: 'user deletion failed'})
    }
}