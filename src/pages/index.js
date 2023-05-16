import { useEffect, useState } from 'react'

import Head from 'next/head'
import CreateUser from '@/components/createUser'

export default  function Home({users}) {

  const deleteUser = (id)=>{
    console.log(id);
  }

  return (
    <>
      <Head>
        <title>Nextjs app testing</title>
      </Head>
      <main className="">
      <CreateUser  />
        {users.length?
          <table>
                <thead>
              <tr>
                <th>User ID</th>
                <th>Full Name</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Delete</th>
              </tr>
                </thead>
                <tbody>
                { users.map(user=><tr key={user.id} >
                  <td>{user.id}</td>
                  <td> {user.lastName} {user.firstName }</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td onClick={()=>deleteUser(user.id)}><button>Delete</button> </td>
                </tr>
                )}
                </tbody>
                
          </table>
        : ''
      }
      </main>
    </>
  )
}


export const getServerSideProps  = async() =>{

  const response = await fetch('http://localhost:3000/api');
  const data = await response.json();

 return {
  props: {
    users: data,
  }
 }
}