import React from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen'; // <--- NEW

function App() {
  return (
    <div className="App">
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            {/* The ? means the ID is optional */}
            <Route path='/cart/:id?' element={<CartScreen />} /> {/* <--- NEW */}
            <Route path='/cart' element={<CartScreen />} />      {/* <--- NEW */}
          </Routes>
        </Container>
      </main>
    </div>
  );
}

export default App;