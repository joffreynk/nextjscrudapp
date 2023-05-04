// import {connection} from "./connection.js";

import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(`===========${file.originalname}===========`);
    cb(null, './public/images'); // save images to the public/images directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // add a timestamp to the filename to ensure uniqueness
  },
});

const upload = multer({ storage: storage });


export default async  function createUser(req, res) {
  // const {username} = req.body

  const { firstName, lastName } = req.body;
  console.log(req.body);
  console.log(`===========${firstName}===========`);


  try {
    await upload.single('file')(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ message: 'Failed to upload image' });
      }

      // extract file path and other metadata
      // const { path, filename } = req.file;


      // insert file path and metadata into database

      return res.status(200).json({ message: 'Image uploaded successfully' });


      // const connection = await getConnection();
      // const result = await connection.query(
      //   'INSERT INTO images (name, description, path, filename) VALUES (?, ?, ?, ?)',
      //   [name, description, path, filename]
      // );
      // console.log(result);

      // return res.status(200).json({ message: 'Image uploaded successfully' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while uploading'})
  }
  
    // const addUser = 'INSERT INTO users (userName, lastName, firstName, email) VALUES(?, ?, ?, ?)';
    // const {userName, lastName, firstName, email} = req.body

    // connection.query(addUser, [userName, lastName, firstName, email], (error, data) => {
    //   if(error) return res.status(401).json({ error: error.message})
    //   return res.status(200).json({ result: 'user created successfully'})
    // })
}
