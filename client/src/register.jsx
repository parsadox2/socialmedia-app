import { useState , useEffect } from 'react';
import './assets/css/Register.css';

function Register() {
  document.body.className = 'home';
  const [dade , setdade] = useState([])
  function Inp(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('confirmpassword').value;
    const email = document.getElementById('email').value;
    const phonenumber = document.getElementById('phonenumber').value;

    // Perform the API request directly in the 'Inp' function
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        confirmpassword,
        email,
        phonenumber,
      }),
      credentials : 'include'
    })
      .then((res) => {
        if(res.ok){
          location.pathname = '/login'
          console.log('ok')
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setdade(data);
      })
  }

  return (
    <div className="main">
      <div className="f">
        <form onSubmit={Inp}>
          <label htmlFor="username">UserName</label>
          <input type="text" name="username" id="username" required placeholder="Username" />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required placeholder="password" />

          <label htmlFor="confirmpassword">ConfirmPassword</label>
          <input type="password" name="confirmpassword" id="confirmpassword" required placeholder="confirmpassword" />

          <label htmlFor="email">email</label>
          <input type="email" id="email" required placeholder="email" name="email" />

          <label htmlFor="phonenumber">phonenumber</label>
          <input type="tel" id="phonenumber" required placeholder="phonenumber" name="phonenumber" />

          <br />
          <button type="submit">Register</button><br />
          {dade.message}
        </form>
      </div>
      
    </div>
  );
}

export default Register;