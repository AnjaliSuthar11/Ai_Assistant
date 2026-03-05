import React, { useContext } from 'react'
import { userDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from "axios"
const Home = () => {

  const navigate = useNavigate()

  const {userData,setUserData,serverUrl}=useContext(userDataContext)

  const handleLogOut = async()=>{
    try{
      const result = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
      setUserData(null)
      navigate("/signin")
    }catch(error){
      setUserData(null)
      console.log(error)
    }

  }

useEffect(() => {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        console.log("Speech Recognition not supported");
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (e) => {
        console.log(e);
    };

    recognition.start();

    return () => recognition.stop();
}, []);


  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#02023d] flex justify-center items-center flex-col  gap-[15px]'>

      <button className='absolute min-w-[150px] text-black mt-[30px] font-semibold h-[60px] bg-white rounded-full text-[19px] top-[20px] right-[20px] cursor-pointer ' onClick={handleLogOut}>Log Out</button>

      <button className='absolute min-w-[150px] text-black mt-[30px] font-semibold h-[60px] bg-white rounded-full text-[19px] top-[100px] right-[20px] px-[20px] py-[10px] cursor-pointer '>Customize your Assistant</button>
    
      <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg '>
        <img src={userData?.assistantImage} alt='' className='h-full object-cover '/> 
      </div>

    <h1 className='text-white text-[18px] font-semibold '>I'm {userData.assistantName}</h1>
     
    


    </div>
  )  
}

export default Home
