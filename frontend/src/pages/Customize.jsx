import React, { useState, useRef, useContext } from 'react'
import Card from '../components/Card'
import { RiImageAddLine } from "react-icons/ri";
import image1 from "../assets/image1.webp"
import image2 from "../assets/image2.webp"
import image3 from "../assets/image3.webp"
import image4 from "../assets/image4.webp"
import image5 from "../assets/image5.webp"
import image6 from "../assets/image6.webp"

import { Navigate, useNavigate } from 'react-router-dom';

import { MdKeyboardBackspace } from 'react-icons/md';
import { userDataContext } from '../context/userContext';


const Customize = () => {

const {serverUrl,userData,setUserData,frontendImage,setFrontendImage,backendImage,setBackendImage,selectedImage,setSelectedImage} = useContext(userDataContext)

const navigate= useNavigate();

  const images = [image1, image2, image3, image4, image5, image6]

  const inputImage = useRef()

  const handleImage=(e)=>{
     const file = e.target.files[0]
     setBackendImage(file)
     setFrontendImage(URL.createObjectURL(file))
  }


  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px] '>
          <MdKeyboardBackspace className="absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer" onClick={()=>navigate("/")}/>
      <h1 className='text-white text-[30px] text-center mb-[40px]'>Select your <span className='text-blue-200'>Assistant Image</span></h1>

      <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]'>

 {images.map((img, index) => (
          <Card key={index} image={img} />
        ))}
  {/* 46:29 */}
     
         <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#020220] border-2 border-[#0000ff66] rounded-2xl overflow-hidden hover:shadow-2xl  hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex justify-center items-center ${selectedImage == "input" ? "border-4 border-white shadow-2xl shadow-blue-950":null }`}  onClick={()=>{inputImage.current.click();
          setSelectedImage("input")
         }}>

        {!frontendImage && <RiImageAddLine className='text-white w-[25px] h-[25px] '/>}
      
        {frontendImage  && <img src={frontendImage} className='h-full object-cover'/>}
      
 

    </div>

    <input type='file' accept='image/*' ref={inputImage} hidden onChange={handleImage}/>

      </div>
{selectedImage &&   <button onClick={()=>navigate("/customize2")} className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full text-[19px] cursor-pointer'>
        Next
      </button> }


    
    </div>
  )
}

export default Customize
