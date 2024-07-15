import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/allpets.css';

export default function AllDetails() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [minPrice, setMinPrice] = useState(1000.00);
  const [maxPrice, setMaxPrice] = useState(500000.00);
  const [colorFilter, setColorFilter] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/auth/users/items`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
      // Initially set filtered orders to all orders
      setFilteredOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSearch = (e) => {
    filterdata(searchQuery)
  }
    const filterdata=(searchQuery)=>{
      const filterData=filteredOrders.filter(customer=>
        customer.petname.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOrders(filterData)
 


   
  };

  const handlePriceFilter = () => {
    // Filter based on price range
    filterOrders(filterQuery, minPrice, maxPrice, colorFilter);
  };

  const handleColorFilterChange = (e) => {
    setColorFilter(e.target.value);
  };

  const filterOrders = (searchQuery, minPrice, maxPrice, colorFilter) => {
    const updatedOrders = orders.filter((order) =>
      order.petname.toLowerCase().includes(searchQuery.toLowerCase()) &&
      order.price >= minPrice && order.price <= maxPrice &&
      (colorFilter ? order.color.toLowerCase() === colorFilter.toLowerCase() : true)
    );
    setFilteredOrders(updatedOrders);
  };

  return (
    <div className='all-ads'>
      <div className='filter-details'>
        <input
          type='number'
          placeholder='Min Price'
          value={minPrice}
          min={1000}
          max={5000}
          onChange={(e) => setMinPrice(parseFloat(e.target.value))}
          className='border p-2 rounded mb-4'
        />
        <input
          type='number'
          placeholder='Max Price'
          value={maxPrice}
          min={5000}
          max={500000}
          onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
          className='border p-2 rounded mb-4'
        />
        <input
          type='text'
          placeholder='Filter by Color'
          value={colorFilter}
          onChange={handleColorFilterChange}
          className='border p-2 rounded mb-4'
        />
        <button onClick={handlePriceFilter}>Apply Price Filter</button>
      </div>
      <div className='search'>
        <input
          type='text'
          placeholder='Search by pet name'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='border p-2 rounded mb-4'
        />
        <button onClick={(e)=>handleSearch(e)}>Search</button>
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
                  <p>Color: {order.color}</p>
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
