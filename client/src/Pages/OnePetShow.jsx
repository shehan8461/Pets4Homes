import {useEffect, useState,useRef} from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';



import './css/OnePetShow.css'

function OnePetShow() {
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



  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-4 text-center">{updatediscount.petname}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Species:</label>
          <p className="text-gray-900">{updatediscount.species}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Breed:</label>
          <p className="text-gray-900">{updatediscount.breed}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Age:</label>
          <p className="text-gray-900">{updatediscount.age}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Gender:</label>
          <p className="text-gray-900">{updatediscount.gender}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Color:</label>
          <p className="text-gray-900">{updatediscount.color}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Weight:</label>
          <p className="text-gray-900">{updatediscount.weight}</p>
        </div>
        <div className="text-center">
         
          <div className='flex justify-center items-center gap-4'>
          <img  value={updatediscount.profilePicture } src={updatediscount.profilePicture || 'https://media.istockphoto.com/id/1294866141/vector/picture-reload.jpg?s=612x612&w=is&k=20&c=Ei6q4n6VkP3B0R30d1VdZ4i11CFbyaEoAFy6_WEbArE='} alt='Profile' className='h-20 w-20 self-center cursor-pointer object-cover border border-gray-300' onClick={handleImage1Click} />
          <img  value={updatediscount.alternateProfilePicture } src={updatediscount.alternateProfilePicture || 'https://media.istockphoto.com/id/1294866141/vector/picture-reload.jpg?s=612x612&w=is&k=20&c=Ei6q4n6VkP3B0R30d1VdZ4i11CFbyaEoAFy6_WEbArE='} alt='Alternate Profile' className='h-20 w-20 self-center cursor-pointer object-cover border border-gray-300' onClick={handleImage2Click} />
        </div>
       
        </div>
        <button  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Buy
          </button>
      </div>
    </div>
  );
}

export default OnePetShow;
