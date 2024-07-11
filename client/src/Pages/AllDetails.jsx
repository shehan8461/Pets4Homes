import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/allpets.css';

export default function AllDetails() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

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

  const handleSearch = () => {
    setFilterQuery(searchQuery);
  };

  const filteredOrders = orders.filter((order) =>
    order.petname.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className='all-ads'>
     <div class="post-ad-btn">
  <a href="/additem" class="post-ad-button">
    Post Free Ad
  </a>
</div>
      <div className='search'>
        <input
          type='text'
          placeholder='Search by pet name'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='border p-2 rounded mb-4'
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {filteredOrders.length > 0 ? (
        <div className='a-ad'>
          {filteredOrders.map((order) => (
            <Link to={`/onepet/${order._id}`} key={order.itemId}>
              <div className='ad-with-photo-name-price'>
                <div className='image-container'>
                  {order.profilePicture && (
                    <img src={order.profilePicture} alt='Profile' />
                  )}
                  <br />
                  {order.alternateProfilePicture && (
                    <img src={order.alternateProfilePicture} alt='Alternate Profile' />
                  )}
                </div>
                <div className='details-container'>
                  <p className='pet-name'>{order.petname}</p>
                  <br />
                  <p id='pet-price'>
                    <span>Rs </span> {order.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className='text-center text-xl'>No matching orders found!</p>
      )}
    </div>
  );
}
