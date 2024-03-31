import React, { useEffect } from 'react';

function App() {
  const testBackendConnection = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/test');
      const data = await response.json();
      console.log('Backend response:', data);
      alert(`Backend says: ${data.message}`);
    } catch (error) {
      console.error('Error connecting to backend:', error);
      alert('Failed to connect to backend.');
    }
  };

  useEffect(() => {
    testBackendConnection();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>Hello world!</div>
      </header>
    </div>
  );
}

export default App;