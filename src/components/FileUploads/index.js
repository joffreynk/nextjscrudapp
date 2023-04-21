import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().required(),
  age: yup.number().positive().integer().required(),
}).required();

export default function FileUpload() {
  const { register, handleSubmit, formState:{ errors }} = useForm({resolver: yupResolver(schema)});
  
  const onSubmit = data => {
    console.log('called');
    data = {...data, profile:data.profile[0]}
    const formData = new FormData(data);
    console.log(formData);

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='text' {...register("firstName")} />
      <input type='file' {...register("profile")} />
      <p>{errors.firstName?.message}</p>
        
      <input type='number' {...register("age")} />
      <p>{errors.age?.message}</p>
      
      <input type="submit" />
    </form>
  );
}