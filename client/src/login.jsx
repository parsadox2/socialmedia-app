import { useState , useEffect } from 'react';
import './assets/css/Register.css';

let a = null;
function Login() {
    useEffect(() =>{
        fetch('http://localhost:3000/login' ,{
            credentials : 'include'
        })
        .then((res) => {
            if(res.status !=200)
            {
                location.pathname ='/'
            }
        })
        
    })
  document.body.className = 'home';
  const [dade , setdade] = useState([])
  function Inp(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Perform the API request directly in the 'Inp' function
    fetch(`http://localhost:3000/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials : 'include'
    })
      .then((res) => {
        if(res.ok){
          location.pathname = '/'
        }
        return res.json();
      })
      .then((data) => {
        setdade(data);
        console.log(data);
      })
  }

  return (
    <div className="main">
      <div className="f">
        <form onSubmit={Inp}>
          <label htmlFor="username">UserName</label>
          <input type="text" name="username" id="username" required placeholder="Username" />
          <br /><br />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required placeholder="password" />

          <br /><br />
          <button type="submit">Register</button><br />
          {dade.message}
        </form>
      </div>
      
    </div>
  );
}

export default Login;