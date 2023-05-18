export default function deleteuser(req, res) {
    console.log(req.body);

    res.status(201).json({message: 'USER DELETED SUCCESSFULLY'})
}