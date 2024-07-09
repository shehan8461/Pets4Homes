import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
      <h2 className='text-center text-4xl font-bold mb-8'>Order History</h2>
      {orders.length > 0 ? (
        <div className='flex flex-col gap-6'>
         
          {orders.map((order) => (
             <Link to={`/onepet/${order._id}`}>
            <div key={order.itemId} className='border rounded-lg p-6 shadow-lg'>
              <p className='text-2xl font-bold mb-2'>{order.petname}</p>
              <p><span className='font-semibold'>Species:</span> {order.species}</p>
              <p><span className='font-semibold'>Breed:</span> {order.breed}</p>
              <p><span className='font-semibold'>Age:</span> {order.age}</p>
              <p><span className='font-semibold'>Gender:</span> {order.gender}</p>
              <p><span className='font-semibold'>Color:</span> {order.color}</p>
              <p><span className='font-semibold'>Weight:</span> {order.weight}</p>
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
