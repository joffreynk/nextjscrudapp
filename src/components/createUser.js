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
    // const formData = new FormData()

    // formData.append('cover', data.cover[0])
    // formData.append('firstName', data.firstName)
    // formData.append('userName', data.userName)
    // formData.append('lastName', data.lastName)
    // formData.append('email', data.email)
    const params = {
      method: 'POST',
      body: JSON.stringify({...data, cover: data.cover[0]}),
      header: { 
        'Content-Type': 'application/json',
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
      <input type='file' {...register("cover")} />
      <p>{errors.cover?.message}</p>
      </div>
      <div>
      <input type='text' {...register("firstName")} />
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