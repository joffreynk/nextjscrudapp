import { useEffect, useState } from 'react'

import Head from 'next/head'
import CreateUser from '@/components/createUser'
import Image from 'next/image';

export default  function Home({users}) {
  
  const deleteUser = (id, url)=>{

    const retrievedUrl = url.split('/').slice(3).join('/')

    const mybody = JSON.stringify({
      userId: id,
      filepath: `./public/${retrievedUrl}`
    })
  
      const params = {
        method: 'DELETE',
        body: mybody,
        headers: {
          // 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary5GT3XfgkP0Jl4K',
          'content-type': 'application/json',
        }
      }
      fetch('http://localhost:3000/api/delete', params)
      .then(response=>response.json())
      .then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
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
                <th>Image</th>
                <th>Email</th>
                <th>Delete</th>
              </tr>
                </thead>
                <tbody>
                { users.map(user=><tr key={user.id} >
                  <td>{user.id}</td>
                  <td> {user.lastName} {user.firstName }</td>
                  <td>{user.username}</td>
                  <td> <Image src={user.profilepicture} width={100} height={100} alt='' /> </td>
                  <td>{user.email}</td>
                  <td onClick={()=>deleteUser(user.id, user.profilepicture)}><button>Delete</button> </td>
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