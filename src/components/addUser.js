
import { useState } from "react";


export default function AddUser({setNewUser}) {
  const [error, setError] = useState()
  const [userinfo, setUserInfo] = useState({})
  const [image, setImage] = useState()
  
  const createUserToAPI = async(e) => {
    e.preventDefault()
    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('firstName', userinfo.firstName);
      formData.append('lastName', userinfo.lastName);
      formData.append('userName', userinfo.userName);
      formData.append('email', userinfo.email);

      console.log(formData);
      const response = await fetch('http://localhost:3000/api/createuser', {
        method: 'POST',
        body: formData, //JSON.stringify(formData),
        headers: { 'Content-Type': 'multipart/form-data; boundary=--------------------------1234567890'},
      });
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  if(error) return error.message

  return (
    <div>
      <form  onSubmit={createUserToAPI}>
      <div>
      <input type='file' name="file" accept="image/*" id="file" onChange={(e)=>setImage(e.target.files[0])} />
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
    </div>
  );
}