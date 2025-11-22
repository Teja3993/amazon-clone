import React from 'react';
import LoginScreen from './screens/LoginScreen';
// import RegisterScreen from './screens/RegisterScreen'; // We hide this for now

function App() {
  return (
    <div className="App">
      {/* We are testing Login now, so show LoginScreen */}
      <LoginScreen />
    </div>
  );
}

export default App;