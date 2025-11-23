import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate('/');
    }
  };

  // CHANGE: Added 'flex-grow-1' to force it to take middle space
  // Added 'mx-4' to give it spacing from the Logo and the Links
  return (
    <Form onSubmit={submitHandler} className='d-flex flex-grow-1 mx-4'> 
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2'
      ></Form.Control>
      <Button type='submit' variant='outline-warning' className='p-2'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;