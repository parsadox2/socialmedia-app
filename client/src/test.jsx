import { useState, useEffect } from 'react';

const Test = () => {
  const [dta, setdta] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setdta(data);
        console.log(data)
      });
  }, []);
  return (
    <div>
      {dta.message}
    </div>
  );
};
export default Test;