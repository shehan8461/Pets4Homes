import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/allpets.css'

export default function AllDetails() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/auth/users/items`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className='container mx-auto p-8'>
    
      {orders.length > 0 ? (
        <div className='flex flex-col gap-6'>
          {orders.map((order) => (
            <Link to={`/onepet/${order._id}`} key={order.itemId}>
              <div className='border rounded-lg p-6 shadow-lg flex-row'>
                <div className='image-container'>
                  {order.profilePicture && (
                    <img src={order.profilePicture} alt="Profile" />
                  )}<br></br>
                  {order.alternateProfilePicture && (
                    <img src={order.alternateProfilePicture} alt="Alternate Profile" />
                  )}
                </div>
                <div className='details-container'>
                  <p className='pt-1 text-2xl font-bold mb-2 '>{order.petname}</p><br></br>
                  <p id="rs"><span className='font-semibold' >Rs </span> {order.price}</p>
      
                
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className='text-center text-xl'>You have no orders yet!</p>
      )}
    </div>
  );
}
