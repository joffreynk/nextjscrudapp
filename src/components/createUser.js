import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().required(),
  age: yup.number().positive().integer().required(),
}).required();

export default function CreateUser() {
  const { register, handleSubmit, formState:{ errors }} = useForm({resolver: yupResolver(schema)});
  
  const onSubmit = data => {

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='text' {...register("firstName")} />
      <p>{errors.firstName?.message}</p>

      <input type='text' {...register("lastName")} />
      <p>{errors.lastName?.message}</p>

      <input type='text' {...register("userName")} />
      <p>{errors.userName?.message}</p>

      <input type='email' {...register("email")} />
      <p>{errors.email?.message}</p>
        
      <input type="submit" />
    </form>
  );
}