import React, { useState ,useEffect,useRef} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth';
import {app} from '../firebase';
import { useSelector,useDispatch } from 'react-redux';
import {getStorage, uploadBytesResumable,ref, getDownloadURL} from 'firebase/storage'


export default function AddItem() {
  const [imagePercent,setImagePercent]=useState(0);
  const fileRef=useRef(null);
  const [image,setImage]=useState(undefined);
  const [error,setError]=useState('');
  const navigate=useNavigate();
  const {currentUser} = useSelector((state) => state.user);
  useEffect(()=>{
    if(image){
      handleFileUpload(image)
        }
    },[image]);

    const handleFileUpload=async (image)=>{
      const storage=getStorage(app)
      const fileName=new Date().getTime()+image.name;
      const storageRef=ref(storage,fileName)
      const uploadTask=uploadBytesResumable(storageRef,image)

      uploadTask.on('state_changed',
        (snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setImagePercent(Math.round(progress))
        
  },

  (error)=>{
    setImageError(true)
  },
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then
    ((downloadURL)=>setFormdata({ ...formdata, 
      profilePicture:downloadURL}))

    }
  
 )};
  const [formdata,setFormdata]=useState({
    userId:currentUser._id,

    petname:"",
    species:"",
    breed:"",
    age:"",
    gender:"",
    color:"",
    weight:"",
   


  })
  



  const handleSubmit=async (e)=>{
    e.preventDefault();
    setError('');
    try{
       
        const res= await fetch('/api/auth/store',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formdata),
        });

        if(!res.ok){
          const data=await res.json();
          throw new Error(data.message||'failed to create items');
        }
       
alert("success")
navigate('/items')
console.log(data)
    }catch(error){
  
      setError(true)
    }
 
   
  }


  return (
    <div className='p-3 max-w-lg mx-auto'><h1 className='text-3xl text-center font-semibold my-7'>Add Pet</h1>
     <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
 
     
    
      <input type="text" placeholder='petname' id='petname' className='bg-slate-100 p-3 rounded-lg' onChange={(e) => setFormdata({ ...formdata, petname: e.target.value })}></input>
      <input type="text" placeholder='species' id='species' className='bg-slate-100 p-3 rounded-lg' onChange={(e) => setFormdata({ ...formdata, species: e.target.value })}></input>
      <input type="text" placeholder='breed' id='breed' className='bg-slate-100 p-3 rounded-lg' onChange={(e) => setFormdata({ ...formdata, breed: e.target.value })}></input>

      <input type="text" placeholder='age' id='age' className='bg-slate-100 p-3 rounded-lg' onChange={(e) => setFormdata({ ...formdata, age: e.target.value })}></input>
      <input type="text" placeholder='gender' id='gender' className='bg-slate-100 p-3 rounded-lg' onChange={(e) => setFormdata({ ...formdata, gender: e.target.value })}></input>
      <input type="text" placeholder='color' id='color' className='bg-slate-100 p-3 rounded-lg' onChange={(e) => setFormdata({ ...formdata, color: e.target.value })}></input>

      <input type="text" placeholder='weight' id='weight' className='bg-slate-100 p-3 rounded-lg' onChange={(e) => setFormdata({ ...formdata, weight: e.target.value })}></input>

      <button  className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Add Pet</button>
     <OAuth/>
     </form>
    
    <div>
      <p>have an account </p>
      <Link to="/sign-in">
      <span className='text-blue-500'>Sign In</span>
      </Link><br></br>
    
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
    </div>
 
    
    
    </div>
  )
}
