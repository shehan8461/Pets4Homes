import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Table } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase'; // Adjust the path as per your project structure
import './css/itemprofile.css';

export default function ItemProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [orderIdToDelete, setOrderIdToDelete] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/auth/user/${currentUser._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);

      // Fetch images from Firebase for each order
      data.forEach(order => {
        if (order.profilePicture) {
          fetchFirebaseImage(order.profilePicture, 'profilePicture', order._id);
        }
        if (order.alternateProfilePicture) {
          fetchFirebaseImage(order.alternateProfilePicture, 'alternateProfilePicture', order._id);
        }
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchFirebaseImage = async (imageUrl, field, orderId) => {
    const storageRef = ref(storage, imageUrl);
    try {
      const downloadUrl = await getDownloadURL(storageRef);
      setOrders(prevOrders => prevOrders.map(order => {
        if (order._id === orderId) {
          return {
            ...order,
            [field]: downloadUrl
          };
        }
        return order;
      }));
    } catch (error) {
      console.error(`Error fetching image from Firebase for ${field}:`, error);
    }
  };

  const handleDeleteOrder = async () => {
    try {
      const res = await fetch(`/api/user/deleteitem/${orderIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderIdToDelete)
        );
      }
      
      setShowModal(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto'>
   <h2 className="my-8 text-center font-bold text-4xl text-gray-800">Pet Information</h2>


      {orders.length > 0 ? (
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Pet Name</Table.HeadCell>
            <Table.HeadCell>Species</Table.HeadCell>
            <Table.HeadCell>Breed</Table.HeadCell>
            <Table.HeadCell>Age</Table.HeadCell>
            <Table.HeadCell>Gender</Table.HeadCell>
            <Table.HeadCell>Color</Table.HeadCell>
            <Table.HeadCell>Weight</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Photos</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {orders.map((order) => (
              <Table.Row key={order._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>{order.petname}</Table.Cell>
                <Table.Cell>{order.species}</Table.Cell>
                <Table.Cell>{order.breed}</Table.Cell>
                <Table.Cell>{order.age}</Table.Cell>
                <Table.Cell>{order.gender}</Table.Cell>
                <Table.Cell>{order.color}</Table.Cell>
                <Table.Cell>{order.weight}</Table.Cell>
                <Table.Cell>{order.price}</Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    {order.profilePicture && (
                      <img src={order.profilePicture} alt="Profile" className="h-20 w-20 object-cover rounded" />
                    )}
                    {order.alternateProfilePicture && (
                      <img src={order.alternateProfilePicture} alt="Alternate Profile" className="h-20 w-20 object-cover rounded" />
                    )}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/update-item/${order._id}`}>
                    <Button id='edit-btn' className="text-green-500"><b>Edit Item</b></Button>
                  </Link>
                  <Button id='delete-btn' className="text-red-500" onClick={() => {
                    setShowModal(true);
                    setOrderIdToDelete(order._id);
                  }}><b>Delete Order</b></Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>You have no orders yet!</p>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center-alert">
            <HiOutlineExclamationCircle  />
            <h3 >Are you sure you want to delete this order?</h3>
          </div>
          <div >
            <Button color='failure' onClick={handleDeleteOrder}>
              Yes, I am sure
            </Button>
            <Button color='gray' onClick={() => setShowModal(false)}>
              No, cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
