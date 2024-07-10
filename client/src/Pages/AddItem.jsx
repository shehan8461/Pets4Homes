import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';

export default function AddItem() {
  const [imagePercent, setImagePercent] = useState(0);
  const fileRef1 = useRef(null);
  const fileRef2 = useRef(null);
  const [imageError, setImageError] = useState(false);
  const [image1, setImage1] = useState(undefined);
  const [image2, setImage2] = useState(undefined);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    userId: currentUser._id,
    petname: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    color: "",
    weight: "",
    profilePicture: "",
    alternateProfilePicture: "",
    price:""
  });

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
          setFormData((prev) => ({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to create item');
      }

      alert('Item added successfully');
      navigate('/items');
    } catch (error) {
      setError('Something went wrong!');
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Add Pet</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Pet Name' id='petname' className='bg-slate-100 p-3 rounded-lg' onChange={(e) => setFormData({ ...formData, petname: e.target.value })} />
        <input type="text" placeholder='Species' id='species' className='bg-slate-100 p-3 rounded-lg' onChange={(e) => setFormData({ ...formData, species: e.target.value })} />
        <input type="text" placeholder='Breed' id='breed' className='bg-slate-100 p-3 rounded-lg' onChange={(e) => setFormData({ ...formData, breed: e.target.value })} />
        <input type="text" placeholder='Age' id='age' className='bg-slate-100 p-3 rounded-lg' onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
        <input type="text" placeholder='Gender' id='gender' className='bg-slate-100 p-3 rounded-lg' onChange={(e) => setFormData({ ...formData, gender: e.target.value })} />
        <input type="text" placeholder='Color' id='color' className='bg-slate-100 p-3 rounded-lg' onChange={(e) => setFormData({ ...formData, color: e.target.value })} />
        <input type="text" placeholder='Weight' id='weight' className='bg-slate-100 p-3 rounded-lg' onChange={(e) => setFormData({ ...formData, weight: e.target.value })} />
        <input type="text" placeholder='Price' id='price' className='bg-slate-100 p-3 rounded-lg' onChange={(e) => setFormData({ ...formData, price: e.target.value })} />

        <input type='file' ref={fileRef1} id='profilePicture' hidden accept='image/*' onChange={(e) => setImage1(e.target.files[0])} />
        <input type='file' ref={fileRef2} id='alternateProfilePicture' hidden accept='image/*' onChange={(e) => setImage2(e.target.files[0])} />

        <div className='flex justify-center items-center gap-4'>
          <button type="button" onClick={handleImage1Click} className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Upload Profile Picture
          </button>
          <button type="button" onClick={handleImage2Click} className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Upload Alternate Profile Picture
          </button>
        </div>

        <div className='flex justify-center items-center gap-4'>
          <img src={formData.profilePicture || 'https://media.istockphoto.com/id/1294866141/vector/picture-reload.jpg?s=612x612&w=is&k=20&c=Ei6q4n6VkP3B0R30d1VdZ4i11CFbyaEoAFy6_WEbArE='} alt='Profile' className='h-20 w-20 self-center cursor-pointer object-cover border border-gray-300' onClick={handleImage1Click} />
          <img src={formData.alternateProfilePicture || 'https://media.istockphoto.com/id/1294866141/vector/picture-reload.jpg?s=612x612&w=is&k=20&c=Ei6q4n6VkP3B0R30d1VdZ4i11CFbyaEoAFy6_WEbArE='} alt='Alternate Profile' className='h-20 w-20 self-center cursor-pointer object-cover border border-gray-300' onClick={handleImage2Click} />
        </div>

        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>Error uploading image (file size must be less than 2 MB)</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent}%`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-400'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>

        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Add Pet</button>
        <OAuth />
      </form>

      {error && <p className='text-red-700 mt-5'>{error}</p>}
    </div>
  );
}
