import React from 'react';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
// import ProfileScreen from './screens/ProfileScreen'; // Comment out Profile for now

function App() {
  return (
    <div className="App">
      <main className='py-3'>
        <Container>
          <HomeScreen />
        </Container>
      </main>
    </div>
  );
}

export default App;