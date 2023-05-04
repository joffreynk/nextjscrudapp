import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from "react";

const schema = yup.object({
  cover: yup.mixed().required(),
  firstName: yup.string().required(),
  userName: yup.string().required(),
  lastName:  yup.string().required(),
  email: yup.string().required(),
}).required();

export default function CreateUser({setNewUser}) {
  const { register, handleSubmit, formState:{ errors }} = useForm({resolver: yupResolver(schema)});
  const [error, setError] = useState()
  
  const createUserToAPI = data => {
    let tt = new FormData()

    tt.set('cover', data.cover[0])
    tt.set('firstName', data.firstName)
    tt.set('userName', data.userName)
    tt.set('lastName', data.lastName)
    tt.set('email', data.email)

    // console.log({...data, cover: data.cover[0]});
    console.log(tt);
    const params = {
      method: 'POST',
      body: new FormData({...data, cover: data.cover[0]}),
      header: { 
        'Content-Type': 'multipart/form-data',
       },
    }
    fetch('http://localhost:3000/api/createuser', params)
    .then(response=>response.json())
    .then(res=>{
      setNewUser(res.result)
    }).catch(err=>{
      console.log(err);
    })
  }

  if(error) return error.message

  return (
    <div>
      <form onSubmit={handleSubmit(createUserToAPI)}>
      <div>
      <input type='file' accept="image/*" {...register("cover")}/>
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
    </div>
  );
}