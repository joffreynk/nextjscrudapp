const upload = (req, res) => {
    console.log(req);
    console.log("backend upload API called");
    res.status(201).json({name: "Joffrey Upload"})
}

export default upload;