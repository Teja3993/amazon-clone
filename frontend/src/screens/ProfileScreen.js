import React, { useState, useEffect } from 'react';

const ProfileScreen = () => {
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

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) return;

    // Fetch current data
    const fetchProfile = async () => {
      const response = await fetch('/api/users/profile', {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      const data = await response.json();
      
      setName(data.name);
      setEmail(data.email);
      // Pre-fill address if it exists
      if (data.shippingAddress) {
        setAddress(data.shippingAddress.address || '');
        setCity(data.shippingAddress.city || '');
        setPostalCode(data.shippingAddress.postalCode || '');
        setCountry(data.shippingAddress.country || '');
      }
    };
    fetchProfile();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      
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
          // Update local storage with new info
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
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h1>User Profile & Address</h1>
      {message && <h3 style={{ color: success ? 'green' : 'red' }}>{message}</h3>}
      
      <form onSubmit={submitHandler}>
        <h3>Account Details</h3>
        <div><label>Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></div>
        <div><label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        <div><label>New Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
        <div><label>Confirm Password</label><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></div>

        <h3>Shipping Address</h3>
        <div><label>Address</label><input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /></div>
        <div><label>City</label><input type="text" value={city} onChange={(e) => setCity(e.target.value)} /></div>
        <div><label>Postal Code</label><input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} /></div>
        <div><label>Country</label><input type="text" value={country} onChange={(e) => setCountry(e.target.value)} /></div>

        <button type="submit" style={{ marginTop: '20px' }}>Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileScreen;