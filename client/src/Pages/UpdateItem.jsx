import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './css/updateUser.css'


function UpdateUser(){
    const navigate=useNavigate();
    const { id } = useParams();
    const [updatediscount,setupdatediscount]=useState({
      petname:"",
      species:"",
      breed:"",
      age:"",
      gender:"",
      color:"",
      weight:""
        
        
    })

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
    


  



  
    <button onClick={handleUpdate}>Update User Details</button><br></br> <br></br> 

 
        </div>
    )
}
export default UpdateUser;