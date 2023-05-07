
import axios from "axios";
import Image from "next/image";
import { useState } from "react";


export default function AddUser({setNewUser}) {
  const [error, setError] = useState()
  const [userinfo, setUserInfo] = useState({})
  const [image, setImage] = useState()
  const [path, setPath] = useState()
  
  const createUserToAPI = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('image', image);
    formData.append('firstName', userinfo.firstName);
    formData.append('lastName', userinfo.lastName);
    formData.append('userName', userinfo.userName);
    formData.append('email', userinfo.email);

    fetch('http://localhost:3000/api/createuser', {
      method: 'POST',
      body: formData,
      'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary5GT3XfgkP0Jl4KV7',
    })
    .then(response =>response.json())
    .then(res => {
      console.log(res);
      setPath(res.path);
    })
    .catch(err => {
      console.log(err);
    });
  }

  if(error) return error.message

  return (
    <div>
      <form  onSubmit={createUserToAPI}>
      <div>
      <input type='file' name="image" accept="image/*" id="image" onChange={(e)=>setImage(e.target.files[0])} />
      {/* <p>{errors.cover?.message}</p> */}
      </div>
      <div>
      <input type='text' id="firstName" onChange={(e)=>setUserInfo({...userinfo, firstName: e.target.value})} />
      {/* <p>{errors.firstName?.message}</p> */}
      </div>
      <div>
      <input type='text' id="lastName" onChange={(e)=>setUserInfo({...userinfo, lastName: e.target.value})} />
      {/* <p>{errors.lastName?.message}</p> */}
      </div>
      <div>
      <input type='text' id="userName" onChange={(e)=>setUserInfo({...userinfo, userName: e.target.value})}  />
      {/* <p>{errors.userName?.message}</p> */}
      </div>
      <div>
      <input type='email' id="email" onChange={(e)=>setUserInfo({...userinfo, email: e.target.value})} />
      {/* <p>{errors.email?.message}</p> */}
      </div>
      <button type="submit"  >Submit</button>
    </form>

    {/* <Image src="http://localhost:3000/images/1683414526276-IMG_1805.JPG" alt="" width={300} height={300} /> */}

    {path?<Image src={path} alt="" width={300} height={300} />:"image is not set"}
    </div>
  );
}