// import {connection} from "./connection.js";

import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images'); // save images to the public/images directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // add a timestamp to the filename to ensure uniqueness
  },
});

const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};


export default async  function createUser(req, res) {
  try {
    await upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Failed to upload image' });
      }

      // extract file path and other metadata
      const { path, filename } = req.file;


      // insert file path and metadata into database
      const mypath = path.split('/')

      return res.status(200).json({ message: 'Image uploaded successfully', path: `/${mypath.slice(1, mypath.length).join('/')}` });


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
