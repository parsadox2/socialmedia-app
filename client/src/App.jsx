
import Register from './register'
import Index from './Index';
import Test from './test';
import Login from './login';
import Logout from './logout';
import ChangePic from './changepic';
import { useCallback } from 'react';
function App() {
  const urlSearch = window.location.pathname;
  if(urlSearch ==='/register')
  {
    return (
      <Register /> 
   )
  }
  else if(urlSearch ==='/'){
    return(
      <Index />
    )
  }
  else if(urlSearch === '/test')
  {
    return(
      <Test />
    )
  }
  else if(urlSearch === '/logout')
  {
    return(
      <Logout />
    )
  }
  else if(urlSearch ===  "/changepic")
  {
    return(
      <ChangePic />
    )
  }
  else if(urlSearch === '/login')
  {
    return(
      <Login />
    )
  }
  else{
    return(
      404
    )
  }
}

export default App
