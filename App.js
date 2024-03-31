import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: 'get',
        url: 'https://api.duffel.com/stays/offers',
        headers: {
          'Accept': 'application/json',
          'Duffel-Version': '1.0.0',
          'Authorization': `Bearer YOUR_ACCESS_TOKEN`
        }
      });

      setData(result.data.data);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {data && data.map((item, index) => (
          <div key={index}>
            <h2>{item.offer.name}</h2>
            <p>{item.offer.description}</p>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;