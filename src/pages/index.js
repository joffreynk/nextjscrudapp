import { useEffect, useState } from 'react'

import Head from 'next/head'
import CreateUser from '@/components/createUser'
import AddUser from '@/components/addUser'

export default  function Home() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState()
  const [newUser, setNewUser] = useState('')



  useEffect( () => {
    fetch('http://localhost:3000/api')
    .then((response)=> response.json())
    .then((res)=> {
      setNewUser(null)
      setUsers(res)
    })
    .catch((error) => {
      setError(error)
    });

  }, [newUser])
  if (error) return error
  
  
  return (
    <>
      <Head>
        <title>Nextjs app testing</title>
      </Head>
      <main className="">
      {/* <CreateUser setNewUser={setNewUser} /> */}
      <AddUser setNewUser={setNewUser} />
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
            {users.length && users.map(user=><tr key={user.id} >
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
