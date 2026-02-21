import React, { useContext } from 'react'
import bg from "../assets/authBg.png"

import {IoEye, IoEyeOff} from "react-icons/io5"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/userContext'
import axios from "axios"

const SignIn = () => {

  const {serverUrl,userData,setUserData} = useContext(userDataContext)

const navigate = useNavigate()
    const [showPassword,setshowPassword] = useState(false)
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [Err,setErr] = useState("")
    const [loading,setLoading] = useState(false)

    const handleSignIn=async (e)=>{
      
      e.preventDefault()
      setErr("")
      setLoading(true)

        try{
          const result = await axios.post(`${serverUrl}/api/auth/signin`,
      { email, password },
      { withCredentials: true } 
    
    );
            setUserData(result.data)
          console.log(result);
          setLoading(false)
          navigate("/")
        }
        catch(error){
          console.log(error.message)
          setUserData(null)
          setLoading(false)
          setErr(error.response.data.message)
        }
    }

  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{backgroundImage:`url(${bg})`}}>
       <form onSubmit={handleSignIn} className='w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]'>
            <h1 className='text-white text-[30px] font-semibold mb-[30px]'>Register to <span className='text-blue-400 '>
             virtual Assistant </span></h1>
             
             <input type='email' placeholder='Email' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px] ' required onChange={(e)=>setEmail(e.target.value)} value={email}/>

             <div className='relative w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px]'>
                <input type={showPassword?'text':'password'} placeholder='password' className='w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]' required onChange={
                  (e)=>setPassword(e.target.value)} value={password}
                />

{showPassword ? (
  <IoEyeOff
    className="absolute top-[18px] right-[20px] text-white w-[25px] h-[25px]"
    onClick={() => setshowPassword(false)}
  />
) : (
  <IoEye
    className="absolute top-[18px] right-[20px] text-white w-[25px] h-[25px]"
    onClick={() => setshowPassword(true)}
  />
)}


</div>

{
Err.length > 0 && <p className='text-red-500 '>
  *{Err}
</p>
}

<button disabled={loading} className='min-w-[150px] text-black mt-[30px] font-semibold h-[60px] bg-white rounded-full text-[19px] '>{ loading ? "Loading...." :"Sign In"}</button>

<p className='text-white text-[18px] cursor-pointer' onClick={()=>navigate("/signup")}>want to create a new account ? <span className='text-blue-400'> Sign Up</span></p>
      </form>
  </div> 
  )
}

export default SignIn
