import { useState  ,useEffect} from 'react';
import './assets/css/Register.css'

function ChangePic() {
    const [dta , setdta] = useState([])

    function Inp(e)
    {
        e.preventDefault();
        const formdata = new FormData();
        let image = document.getElementById('img')
        formdata.append('image' , image.files[0])
        fetch('http://localhost:3000/changepic',{
            method : 'PUT',
            body : formdata,
            credentials : 'include'
        })
        .then((res) =>{
            return res.json()
        })
        .then((data) =>{
            setdta(data)
            console.log(data)
        })
    }

  return (
    <div className="main">
      <div className="f">
        <form onSubmit={Inp}>
          <img src="/sd" alt="s" />
          <input id='img' type="file" name='image' />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default ChangePic;