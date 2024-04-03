import { useState , useEffect } from "react";

function Logout()
{
    function Run()
    {
        
            fetch('http://localhost:3000/logout' , {
                credentials : "include"
            })
            .then((res) =>{
                
                return res.json()
                
            })
            .then((data) =>{
                location.pathname = '/register'
                console.log(data)
            })
        
    }
    return(
        <button onClick={Run}>logout</button>
    )
}

export default Logout