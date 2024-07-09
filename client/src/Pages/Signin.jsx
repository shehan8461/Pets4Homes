import  { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/User/userSlice';
import OAuth from '../components/OAuth';


export default function SignIn() {
  const [formdata,setFormdata]=useState({})
  const {loading,error}=useSelector((state)=>state.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleChange=(e)=>{
    setFormdata({...formdata,[e.target.id]:e.target.value})
  }


  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
        dispatch(signInStart())
        const res= await fetch('/api/auth/signin',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formdata),
        });
        const data=await res.json();
     
       if(data.success===false){
        dispatch(signInFailure(data.message))
        
        return;
       }
       dispatch(signInSuccess(data))
    navigate('/')
    }catch(error){
     dispatch(signInFailure(error))
    }
 
  }


  return (
    <div className='p-3 max-w-lg mx-auto'><h1 className='text-3xl text-center font-semibold my-7'>SignIn</h1>
     <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

      
      <input type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}></input>
      <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}></input>

   
      <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'> {loading ? 'Loading...' :'Sign In'}</button>
     <OAuth/>
     </form>
  
    <div>
      <p>Don't have an account </p>
      <Link to="/sign-up">
      <span className='text-blue-500'>Sign Up</span>
      </Link>
      <p className='text-red-700 mt-5'>{error ? error || 'Something went wrong!':''}</p>
    </div>
    
    
    
    </div>
  )
}
