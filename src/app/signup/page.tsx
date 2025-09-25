"use client"

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast"
export default function signupPage() {
    const router = useRouter() 
    //this must be imported from next/navigation
    const [user ,setUser] = useState({
        username:"",
        email:"",
        password:""
    })

    const [loading ,setLoading ] = useState(false)
    const [buttondisable ,setbuttonDisbabled] = useState(false) //until the fiedls arean;t filled u cant click the button
    //we will mount this sto sinup button

    const signup = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();
      try {
        setLoading(true);
        const response = await axios.post("/api/signup", user)
        console.log("SignUp sucsess",response.data)
        router.push("/login")
      
      } catch (error: any) {
        console.log("sign up error", error);
        toast.error(error.response.data.error)
      }
    }


    useEffect(()=>{
      if(user.email.length > 0 && user.password.length > 0 && user.username.length >0){
          setbuttonDisbabled(false)
      }else{
        setbuttonDisbabled(true)
      }
    },[user])


  return (
    <form style={{ maxWidth: "300px", margin: "auto" }} onSubmit={signup}>
    <h1>
      {loading ? "processing" : "signup"}
    </h1>
    <label htmlFor="username">username</label>
      <input
        id="username"
        value={user.username} //if u observe we have take three different fields in the object of usestate 
        onChange={(e)=>setUser({...user,username:e.target.value})}
        placeholder='username'
        type='text'
        style={{ display: "block", margin: "10px 0", width: "100%" }}
      />
      <label htmlFor="username">password</label>
      <input
        id="password"
        value={user.password} //if u observe we have take three different fields in the object of usestate 
        onChange={(e)=>setUser({...user,password:e.target.value})}
        placeholder='password'
        type='text'
        style={{ display: "block", margin: "10px 0", width: "100%" }}
      />
      <label htmlFor="email">email</label>
      <input
        id="email"
        value={user.email} //if u observe we have take three different fields in the object of usestate 
        onChange={(e)=>setUser({...user,email:e.target.value})}
        placeholder='email'
        type='text'
        style={{ display: "block", margin: "10px 0", width: "100%",border:"3px white" }}
      />
      <button type="submit" 
      style={{ marginTop: "10px" ,border :"gray-300"}}>
      { buttondisable ? "plz fill the deatils ": "Sign up"  }
    
      </button>
    <br/>
    <Link href="/login">Login</Link>
    </form>
  

    
  )
}



