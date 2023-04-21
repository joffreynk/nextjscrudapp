import { useEffect, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import FileUpload from '@/components/FileUploads'

export default  function Home() {
  const [users, setUsers] = useState([])



  useEffect( () => {
    fetch('http://localhost:3000/api')
    .then((response)=> response.json())
    .then((res)=> {
      setUsers(res)
    })
    .catch((error) => {
      console.log(error);
    });

  }, [])

console.log("Running");
  
  
  return (
    <>
      <Head>
        <title>Nextjs app testing</title>
      </Head>
      <main className="">
      <FileUpload />
        <table>
              <thead>
            <tr>
              <th>User ID</th>
              <th>Full Name</th>
              <th>User Name</th>
              <th>Email</th>
            </tr>
              </thead>
              <tbody>
            {users.map(user=><tr key={user.id} >
              <td>{user.id}</td>
              <td> {user.lastName} {user.firstName }</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td></td>
            </tr>
             )}
             </tbody>
        </table>

      </main>
    </>
  )
}
