const express = require('express')
const app = express()
const logger = require('morgan')
const cors = require('cors');
// app.use(cors({optionsSuccessStatus: 200}));
app.use(express.json())
app.use(logger("dev"))
app.use(express.static('public'));


app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
  });

app.get('/api/:date', (req, res)=>{
    const date = decodeURI(req.params.date)
    const dateStrFromUnix = new Date(Number(date))
    if(dateStrFromUnix == "Invalid Date" && new Date(date) == "Invalid Date"){
        res.json({error: "Invalid Date"})
    }else if(date == Number(date)){
        res.json({unix: +date, utc: new Date(Number(date)).toUTCString()})
    }else{
        const parsedDate = Date.parse(date)
        res.json({unix: parsedDate, utc: new Date(date).toUTCString()})
    }
})

app.get('/api', (req, res)=>{
    const now = new Date()
        res.json({unix: Date.parse(now), utc: now.toUTCString()})
})

app.listen(3000,()=>{
    console.log("Server Started!")
})