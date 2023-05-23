import {connection} from "./connection.js";
import os from 'os';
import fs from 'fs';

import multer from 'multer';

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images'); // save images to the public/images directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // add a timestamp to the filename to ensure uniqueness
  },
});

const upload = multer({ storage: storage });

const addUser = async(req, res)=>{
  let fullUrl = req.headers.origin
  try {
    await upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Uploading error, please verify your image' });
      }

      // extract file path and other metadata
      const { path } = req.file;

      const imgURL = `${fullUrl}/${path.split(os.type() == 'Windows_NT' ? '\\' : '/').slice(1).join('/')}`

      // insert file path and metadata into data
      const {userName, lastName, firstName, email} = req.body;
      const sql =  'INSERT INTO users (userName, lastName, firstName, email, profilepicture) VALUES(?, ?, ?, ?, ?)';
      const values = [userName, lastName, firstName, email, imgURL]

      connection.query(sql, values, (err, result) => {
        if (err) {
          if(fs.existsSync(path)) fs.unlinkSync(path);
          return res.status(404).json({message: 'The User is not created'})
        }
      return res.status(200).json({ message: 'User created successfully successfully' });

      });

    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while uploading'})
  }
}

const getUsers = async(req, res) => {
  try {
    return res.status(200).json({ message: 'Image retrieved successfully'});
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: 'Image retrieved failed' });
  }
}


const editUser = async(req, res) => {
  try {
    return res.status(200).json({ message: 'user Updated successfully'});
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: 'user is not Updated' });
  }
}

const deleteUser = async(req, res) => {
  console.log(req.body);
  try {
    return res.status(200).json({ message: 'user deleted successfully'});
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: 'user is not deleted' });
  }
}



export default   function createUser(req, res) {
  const method = req.method
   switch (method){
    case 'POST': addUser(req, res);
    break;
    case 'GET': getUsers(req, res);
    break;
    case 'PUT': editUser(req, res);
    break;
    case 'DELETE': deleteUser(req, res);
    break;
    default: getUser(req, res);
    break;
   }
}
