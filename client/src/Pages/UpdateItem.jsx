import {useEffect, useState,useRef} from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './css/updateitem.css';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';



function UpdateUser(){
  const [imagePercent, setImagePercent] = useState(0);
    const navigate=useNavigate();
    const { id } = useParams();
    const fileRef1 = useRef(null);
    const fileRef2 = useRef(null);
    const [image1, setImage1] = useState(undefined);
    const [image2, setImage2] = useState(undefined);
    const [updatediscount,setupdatediscount]=useState({
      petname:"",
      species:"",
      breed:"",
      age:"",
      gender:"",
      color:"",
      weight:"",
      profilePicture: "",
    alternateProfilePicture: "",
    price:""
        
        
    })
    useEffect(() => {
      if (image1) {
        handleFileUpload(image1, 'profilePicture');
      }
    }, [image1]);
  
    useEffect(() => {
      if (image2) {
        handleFileUpload(image2, 'alternateProfilePicture');
      }
    }, [image2]);
  
    const handleFileUpload = async (image, field) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImagePercent(Math.round(progress));
        },
        (error) => {
          setImageError(true);
          setError('Image upload failed');
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setupdatediscount((prev) => ({
              ...prev,
              [field]: downloadURL
            }));
          });
        }
      );
    };
  
    const handleImage1Click = () => {
      fileRef1.current.click();
    };
  
    const handleImage2Click = () => {
      fileRef2.current.click();
    };
  
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`/api/user/getitem/${id}`);
            const data = await response.json();
            console.log(data);
    
            if (data.success) {
                setupdatediscount(data.data);
            } else {
              console.error(data.message);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, []);



      const handleInputChange = (e) => {
        setupdatediscount({
          ...updatediscount,
          [e.target.name]: e.target.value,
        });
      };
      const handleUpdate = async () => {
        try {
          const response = await fetch(`/api/user/updateitem`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: updatediscount._id,
              ...updatediscount,
            }),
          });
    
          const data = await response.json();
    
          if (data.success) {
            
            console.log('user  updated successfully');
           alert("updated successfully");
       

          } else {
            console.error(data.message);
          }
         navigate('/items')
        } catch (error) {
          console.error('Error updating user:', error);
        }
      };


    return(
        <div className='service-update'>


    <lable>Pet Name:</lable>
    <input type="text" id="petname" name="petname" onChange={handleInputChange} value={updatediscount?.petname }/><br></br>
    <lable>Species:</lable>
    <input type="text" id="species" name="species" onChange={handleInputChange} value={updatediscount?.species }/><br></br>
    <lable>Breed:</lable>
    <input type="text" id="breed" name="breed" onChange={handleInputChange} value={updatediscount?.breed }/><br></br>
    <lable>Age:</lable>
    <input type="text" id="age" name="age" onChange={handleInputChange} value={updatediscount?.age }/><br></br>
    <lable>Gender:</lable>
    <input type="text" id="gender" name="gender" onChange={handleInputChange} value={updatediscount?.gender }/><br></br>
    <lable>Color:</lable>
    <input type="text" id="color" name="color" onChange={handleInputChange} value={updatediscount?.color }/><br></br>    
    <lable>Weight:</lable>
    <input type="text" id="weight" name="weight" onChange={handleInputChange} value={updatediscount?.weight }/><br></br>
    <lable>Price:</lable>
    <input type="text" id="price" name="price" onChange={handleInputChange} value={updatediscount?.price }/><br></br>
    <input type='file' ref={fileRef1} id='profilePicture' hidden accept='image/*' onChange={(e) => setImage1(e.target.files[0])} />
        <input type='file' ref={fileRef2} id='alternateProfilePicture' hidden accept='image/*' onChange={(e) => setImage2(e.target.files[0])} />

    <div className='flex justify-center items-center gap-4'>
          <button type="button" onClick={handleImage1Click} className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Upload First Picture
          </button>
          <button type="button" onClick={handleImage2Click} className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Upload Alternate  Picture
          </button>
        </div>

        <div className='flex justify-center items-center gap-4'>
          <img onChange={handleInputChange} value={updatediscount?.profilePicture } src={updatediscount.profilePicture || 'https://media.istockphoto.com/id/1294866141/vector/picture-reload.jpg?s=612x612&w=is&k=20&c=Ei6q4n6VkP3B0R30d1VdZ4i11CFbyaEoAFy6_WEbArE='} alt='Profile' className='h-20 w-20 self-center cursor-pointer object-cover border border-gray-300' onClick={handleImage1Click} />
          <img onChange={handleInputChange} value={updatediscount?.alternateProfilePicture } src={updatediscount.alternateProfilePicture || 'https://media.istockphoto.com/id/1294866141/vector/picture-reload.jpg?s=612x612&w=is&k=20&c=Ei6q4n6VkP3B0R30d1VdZ4i11CFbyaEoAFy6_WEbArE='} alt='Alternate Profile' className='h-20 w-20 self-center cursor-pointer object-cover border border-gray-300' onClick={handleImage2Click} />
        </div>

    


  



  
    <button className='update-btn' onClick={handleUpdate}>Update Pet Details</button><br></br> <br></br> 

 
        </div>
    )
}
export default UpdateUser;