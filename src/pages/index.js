import { useEffect, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

export default  function Home() {
  const [users, setUsers] = useState([])

  useEffect( () => {
    fetch('http://localhost:3000/api')
    .then((response)=> response.json())
    .then((res)=> {
      const data = res.results;
      setUsers(data)
      console.log(data)
    })
    .catch((error) => {
      console.log(error);
    });

  }, [])
  
  return (
    <>
      <Head>
      </Head>
      <main className="">
        <table>
            <tr>
              <th>User ID</th>
              <th>Full Name</th>
              <th>User Name</th>
              <th>Email</th>
              <th></th>
            </tr>
            {users.map(user=><tr key={user.id} >
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td></td>
            </tr>
             )}
        </table>

      </main>
    </>
  )
}
