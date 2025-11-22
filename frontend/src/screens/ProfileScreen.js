import React, { useState, useEffect } from 'react';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // 1. Get user info from storage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo) {
      setMessage('Not Logged In');
      return;
    }

    // 2. Fetch Profile Data
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/users/profile', {
          method: 'GET',
          headers: {
            // CRITICAL: Send the token in the Authorization header
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setName(data.name);
          setEmail(data.email);
        } else {
          setMessage('Error fetching profile');
        }
      } catch (error) {
        setMessage('Network Error');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Profile</h1>
      {message ? (
        <h2 style={{ color: 'red' }}>{message}</h2>
      ) : (
        <div>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Role:</strong> Customer</p>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;