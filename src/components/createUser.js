import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from "react";
import Image from "next/image";

const schema = yup.object({
  // image: yup.mixed().required(),
  firstName: yup.string().required(),
  userName: yup.string().required(),
  lastName:  yup.string().required(),
  email: yup.string().required(),
}).required();

export default function CreateUser() {
  const { register, handleSubmit, formState:{ errors }} = useForm({resolver: yupResolver(schema)});
  const [path, setPath] = useState()
  const [image, setImage] = useState()
  
  const createUserToAPI = data => {
    let tt = new FormData()

    tt.set('image', image)
    tt.set('firstName', data.firstName)
    tt.set('userName', data.userName)
    tt.set('lastName', data.lastName)
    tt.set('email', data.email)

    const params = {
      method: 'POST',
      body: tt,
      'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary5GT3XfgkP0Jl4KV7',
    }
    fetch('http://localhost:3000/api/createuser', params)
    .then(response=>response.json())
    .then(res=>{
      console.log(res);
      setPath(res.path);
    }).catch(err=>{
      console.log(err);
    })
  }


  return (
    <div>
      <form onSubmit={handleSubmit(createUserToAPI)}>
      <div>
      <input type='file' name="image" accept="image/*" id="image" onChange={(e)=>setImage(e.target.files[0])} />
      {/* <p>{errors.cover?.message}</p> */}
      </div>
      <div>
      <input type='text'  {...register("firstName")} />
      <p>{errors.firstName?.message}</p>
      </div>
      <div>
      <input type='text' {...register("lastName")} />
      <p>{errors.lastName?.message}</p>
      </div>
      <div>
      <input type='text' {...register("userName")} />
      <p>{errors.userName?.message}</p>
      </div>
      <div>
      <input type='email' {...register("email")} />
      <p>{errors.email?.message}</p>
      </div>
      <input type="submit" />
    </form>

    {path?<Image src={path} alt="" width={300} height={300} />:"image is not set"}
    </div>
  );
}