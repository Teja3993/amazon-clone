import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listMyOrders } from '../actions/orderActions';

const ProfileScreen = () => {
  // --- STATE FOR FORM ---
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Address State
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- REDUX SELECTORS ---
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Get Order History from Redux
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  // --- USE EFFECT (Load Data) ---
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    // 1. Fetch Profile Data to pre-fill the form
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/users/profile', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        const data = await response.json();
        
        setName(data.name);
        setEmail(data.email);
        if (data.shippingAddress) {
          setAddress(data.shippingAddress.address || '');
          setCity(data.shippingAddress.city || '');
          setPostalCode(data.shippingAddress.postalCode || '');
          setCountry(data.shippingAddress.country || '');
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();

    // 2. Fetch Order History
    dispatch(listMyOrders());

  }, [dispatch, navigate, userInfo]);

  // --- SUBMIT HANDLER (Update Profile) ---
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      try {
        const response = await fetch('/api/users/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
          body: JSON.stringify({ 
            name, email, password, 
            address, city, postalCode, country 
          }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setSuccess(true);
          setMessage('Profile Updated Successfully!');
          localStorage.setItem('userInfo', JSON.stringify(data));
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage('Update Failed');
      }
    }
  };

  return (
    <Row>
      {/* LEFT SIDE: User Profile & Address Form */}
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <h3 style={{ color: success ? 'green' : 'red', fontSize: '1rem' }}>{message}</h3>}
        
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'><Form.Label>Name</Form.Label><Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)}></Form.Control></Form.Group>
          <Form.Group controlId='email'><Form.Label>Email Address</Form.Label><Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control></Form.Group>
          <Form.Group controlId='password'><Form.Label>New Password</Form.Label><Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control></Form.Group>
          <Form.Group controlId='confirmPassword'><Form.Label>Confirm Password</Form.Label><Form.Control type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control></Form.Group>

          <h4 style={{marginTop: '20px'}}>Shipping Address</h4>
          <Form.Group controlId='address'><Form.Label>Address</Form.Label><Form.Control type='text' value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control></Form.Group>
          <Form.Group controlId='city'><Form.Label>City</Form.Label><Form.Control type='text' value={city} onChange={(e) => setCity(e.target.value)}></Form.Control></Form.Group>
          <Form.Group controlId='postalCode'><Form.Label>Postal Code</Form.Label><Form.Control type='text' value={postalCode} onChange={(e) => setPostalCode(e.target.value)}></Form.Control></Form.Group>
          <Form.Group controlId='country'><Form.Label>Country</Form.Label><Form.Control type='text' value={country} onChange={(e) => setCountry(e.target.value)}></Form.Control></Form.Group>

          <Button type='submit' variant='primary' className='mt-3'>Update Profile</Button>
        </Form>
      </Col>

      {/* RIGHT SIDE: My Orders Table */}
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <p>Loading...</p>
        ) : errorOrders ? (
          <p style={{color: 'red'}}>{errorOrders}</p>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;