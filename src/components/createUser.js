import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from "react";

const schema = yup.object({
  firstName: yup.string().required(),
  userName: yup.string().required(),
  lastName:  yup.string().required(),
  email: yup.string().required(),
}).required();

export default function CreateUser() {
  const { register, handleSubmit, formState:{ errors }} = useForm({resolver: yupResolver(schema)});
  const [error, setError] = useState('')
  
  const createUserToAPI = data => {
    const params = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch('http://localhost:3000/api', params)
    .then(response=>response.json)
    .then(res)
  }

  return (
    <form onSubmit={handleSubmit(createUserToAPI)}>
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
  );
}