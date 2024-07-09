import { useState, useEffect } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { Button, Modal, Table } from 'flowbite-react';
import {  deleteUserStart,deleteUserSuccess,deleteUserFailure } from '../redux/User/userSlice';
import { HiOutlineCurrencyDollar, HiOutlineExclamationCircle, HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from 'react-router-dom';
import './css/itemprofile.css'

export default function ItemProfile() {
  
  const { currentUser } = useSelector((state) => state.user);
  const [order, setOrders] = useState([]);
  const [orderIdToDelete, setOrderIdToDelete] = useState('');
  const [showModel, setShowModel] = useState(false);



  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/auth/user/${currentUser._id}`);
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
    if (currentUser) {
      fetchOrders();
    }
  }, [order]);

  const handleDeleteOrder = async () => {

    try {
        const res = await fetch(`/api/user/deleteitem/${orderIdToDelete}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        if (!res.ok) {
            console.log(data.message);
        } else {
            setOrders((prev) =>
                prev.filter((order) => order._id !== orderIdToDelete)
            );
        }
        alert("deleted")
    } catch (error) {
        console.log(error.message);
    }
};

  


  return (
    <div className='table-auto overflow-x-scroll mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      <h2 className='my-7 text-center font-semibold text-3xl'>Pet Details</h2>

      {order.length > 0 ? (
        <>
          <Table  hoverable className='shadow-md '>
            <Table.Head>
        
       
              <Table.HeadCell>Pet Name</Table.HeadCell>
              <Table.HeadCell>Specias</Table.HeadCell>
              <Table.HeadCell>Bread</Table.HeadCell>
              <Table.HeadCell>Age</Table.HeadCell>
              <Table.HeadCell>Gender</Table.HeadCell>
              <Table.HeadCell>Color</Table.HeadCell>
              <Table.HeadCell>Weight</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            {order.map((order) => (
              <Table.Body className='divide-y' key={order.petId}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>

                
                  <Table.Cell>{order.petname}</Table.Cell>
                  <Table.Cell>{order.species}</Table.Cell>
                  <Table.Cell>{order.breed}</Table.Cell>
                  <Table.Cell>{order.age}</Table.Cell>
                  <Table.Cell>{order.gender}</Table.Cell>
                  <Table.Cell>{order.color}</Table.Cell>
                  <Table.Cell>{order.weight}</Table.Cell>
                  
                  <Table.Cell>
                  <Link to={`/update-item/${order._id}`}>
                                                <Button className="text-green-500"><b>Edit Item</b>
                                                
                  </Button>
                  
                  
                  </Link>
                    
                    <Button  className="text-red-500"onClick={() => {
                                                setShowModel(true);
                                                setOrderIdToDelete(order._id);
                                            }}><b>Delete Order</b></Button>
                    </Table.Cell>
                 
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>You have no orders yet!</p>
      )}
      <Modal show={showModel} onClose={() => setShowModel(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">Are you sure you want to Delete this Order</h3>
                    </div>
                    <div className='flex justify-center gap-4'>
                        <Button color='failure' onClick={handleDeleteOrder}>
                            Yes, I am sure
                        </Button>
                        <Button color='gray' onClick={() => setShowModel(false)}>
                            No, cancel
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
    </div>
  );
}
