import { useState , useEffect } from 'react'
import './assets/css/style.css'

function Index(){
    let [AudineceNum , SetAudineceNum] = useState(-1)
    let [Audineces , SetAudineces] = useState([])
    let [message1 , setMessage] = useState([])
    let [ThisUserNum , SetThisUserNum] = useState({})
    useEffect(() =>{
      fetch(`http://localhost:3000/main/${AudineceNum}` , {
        credentials : 'include'
      })
      .then((res) =>{
        if(res.status == 406)
        {
          location.pathname = '/login'
        }
        return res.json()
      })
      .then((data) =>{
        setMessage(data.Txtmessage)
        SetThisUserNum(data.user)
        SetAudineces(data.users)
      })
    })
    function sendMessage(el)
    {
      
      fetch(`http://localhost:3000/seemessages/${AudineceNum}` , {
        method : "POST",
        credentials : 'include',
        headers :{'Content-Type': 'application/json'},
        body : JSON.stringify({message : el}),
      })
      .then((res) =>{
        return res.json()
      })
      .then((data) =>{
        console.log(data)
      })
    }
    document.body.style.display = "block"
    let el = document.getElementsByClassName('textmessage')
    for(let i =0 ; i<el.length;i++)
    {
      if(el[i].id == ThisUserNum.userId)
      {
        el[i].style = "background-color: #005fa7; direction : rtl"
      }
      else
      {
        el[i].style = "background-color: green;"
      }
    }
    return(
        <div className="index">
            <header>
  <nav class="navbar">
    <div class="profile">
      <h2>{ThisUserNum.username}</h2>
      <img src={ThisUserNum.ImageUrl} alt="Profile Picture" />
    </div>
    <div class="logo">
      <img src='' alt="Logo" />
    </div>
  </nav>
</header>
<div class="chat-container">
  <div id='side' className="sidebar">
    
    {Audineces.map((au) =>(
      <div className="user" onClick={() =>{
        SetAudineceNum(au.userId)
      }}>
        <img src={au.ImageUrl} alt="" />
        <p>{au.username}</p>
      </div>
    ))}
    
  </div>
  <div class="chat-box">
    <div class="messages">
        <div id='messages1' class="messages1">
          <filter>
            {message1?.map((mess) =>(
            <div id={mess.FromUser} className="message textmessage">
              {mess.TextMessage}
            </div>
          ))}
          </filter>
          
        </div>
        
        
        </div>
        <div class="form">
            <input  className='txt' type="text" id='text'  placeholder="Type your message..." />
            <button className='btn' onClick={() =>{
              let element = document.getElementById('text');
              sendMessage(element.value)
            }} >Send</button>
        </div>
        
    </div>
    
</div>

        </div>
    )
}

export default Index;
     