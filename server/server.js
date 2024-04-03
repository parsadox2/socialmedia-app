const express = require('express');
const bodyparser = require('body-parser')
const mysql = require('mysql');
const bcrypt = require('bcrypt')
const session = require('express-session')
const { CONNREFUSED } = require('dns');
const { equal } = require('assert');
const hashkey = "7anc8ya4763c63t3w6cvea6wcv63wamcjt6ivta63wcjjt"
const app = express();
const bulker = require('multer')
const upload = require('./uploadFile');
const multer = require('multer');

let connection = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: '',
    database:'test_db'
})

connection.connect()

app.use(bodyparser.json())
app.use( '/static',express.static('uploads'))
app.use(session({
    secret: 'shh this is secret',
    resave: false,
    saveUninitialized: true,
  }));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.get('/main/:userId' , (req , res) =>{
    if(!req.session.user)
    {
        return res.json({message : 'you are not logged in'} , 406)
    }
    let result = {}
    const toUser = +(req.params.userId)
    if(toUser == NaN) return res.status(400).json({error:"Invalid User ID"}).end();

    connection.query(`select * from users where userId = "${toUser}"` , (err , rows) =>{
        if(err) throw err
        if(rows[0])
        {
            connection.query(`select * from messages where FromUser = ${toUser} or ToUser = ${toUser}` , (err , rows) =>{
                result.Txtmessage = rows
                result.message = ""
            })
        }
        else
        {
            result.Txtmessage = []
            result.message = "user is not valid"
        }
    })
    
    connection.query(`select userId , username , ImageUrl from users where not username = "${req.session.user.username}"` , (err , rows)=>{
        result.users = rows
    })
    result.user = req.session.user
    let key = result.user.userId
    connection.query(`select distinct ToUser from messages where ToUser = ${key} or FromUser = ${key}`, (err , rows) =>{
        if(err) throw err
        if(rows.length> 0)
        {
            let query =`select username from users where userId = ${rows[0].ToUser}`
            for(let i =1 ; i < rows.length ; i++)
            {
                query +=  ` or userId= ${rows[i].ToUser}`
            }
            connection.query(query,(err , rows) =>{
                if(err) throw err
                result.audience = rows
                return res.json(result).end()
            })
        }
        else
        {
            
            return res.json(result)
        }
    })
    
    
})


app.post('/seemessages/:userId' , (req , res) =>{
    
    if (!req.session.user)
    {
        return res.json({message : "please login first"} , 401).end()
    }
    
    const message = req.body.message
    const toUser = +(req.params.userId)
    if(toUser == NaN) return res.status(400).json({error:"Invalid User ID"}).end();

    connection.query(`select * from users where userId = "${toUser}"` , (err , rows) =>{
        if(err) throw err
        if(rows[0])
        {
            connection.query(`insert into Messages(TextMessage , ToUser , FromUser , TimeSended) values("${message}" , "${toUser}" , "${req.session.user.userId}" , NOW())` )
            connection.query(`select * from messages where FromUser = ${toUser} or ToUser = ${toUser}` , (err , rows) =>{
                res.json({message : "message snedded"})
            })
        }
        else
        {
            return res.status(400).json({error:"Invalid User ID"}).end();
        }
    })
    
})

app.post('/register' , (req , res) =>{
    const username = req.body.username
    const password = req.body.password
    const confirmpassword = req.body.confirmpassword
    const email = req.body.email
    const phonenumber = req.body.phonenumber
    const hash = bcrypt.hashSync(password + hashkey , 10)

    if(username && password && confirmpassword && email && phonenumber)
    {
        if(password != confirmpassword)
        {
            return res.json({message : "passwords are not match"} , 406).end()
        }
        if(password.length< 8)
        {
            return res.json({message : "Password should be at least 8 characters long."} , 422).end()
        }
        connection.query(`select * from users where username = "${username}"` , (err , rows) =>{
            if(err) throw err
            if(rows[0])
            {
                return res.json({message : "User already exists"} , 409).end()
            }
            else
            {
                connection.query(`insert into users(username , password , email , phonenumber , ImageUrl) values("${username}" , "${hash}" , "${email}" , "${phonenumber}" , "http://localhost:3000/static/vecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg")`)
                connection.query(`select * from users where username = "${username}"` , (err  , rows) =>{
                    if(err) throw err
                    if(rows[0])
                    {
                        return res.json(rows[0]).status(201).send().end()
                    }
                    else
                    {
                        return res.status(500).send('')
                    }
                })
            }
        })
    }
    else
    {
        return res.json({message : 'please enter all fields'} , 401).end()
    }
})

app.get('/login' , (req , res) =>{
    if(req.session.user)
    {
        return res.json({message : "you are logged in"} , 406)
    }
    return res.json({message : 'ok'})
})

app.post('/login' , (req , res) =>{
    if(req.session.user)
    {
        return res.json({message : "u are logged in"} , 406)
    }
    const username = req.body.username
    const password = req.body.password

    connection.query(`select * from users where username = "${username}"` , (err , rows) =>{
        if(err) throw err
        if(rows[0])
        {
            let check = bcrypt.compareSync( password  + hashkey , rows[0].password) 
            if(check)
            {
                req.session.user = rows[0]
                return res.json(rows[0] , 201).end()
            }
        }
        else
        {
            return res.json({message : "user does not exist"})
        }
    })
})

app.get('/logout' , (req , res) =>{
    req.session.user = null
    res.json({ message: "Logged out!" }).end()
})

app.put('/changepic', upload.single('image') , (req, res) =>{
    if(!req.session.user)
    {
        return res.json({message : 'u are not logged in'})
    }
    let user = req.session.user.userId
    connection.query(`update users set ImageUrl = "http://localhost:3000/static/${req.file.filename}" where userId =${user}`)
    req.session.user.ImageUrl = `http://localhost:3000/static/${req.file.filename}`
    res.json({message :"image changed"})

})



app.listen(3000)