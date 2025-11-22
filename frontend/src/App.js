import React from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom'; // <--- NEW IMPORTS
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
// We will create ProductScreen in the next subtask, but we can define the route now
// For now, we won't import it to avoid errors.

function App() {
  return (
    <div className="App">
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            {/* We will add the Product route in the next step */}
          </Routes>
        </Container>
      </main>
    </div>
  );
}

export default App;