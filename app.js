const express = require('express')
const app = express()
const logger = require('morgan')

app.use(express.json())
app.use(logger("dev"))


app.get('/api/:date', (req, res)=>{
    const {date} = req.params
    const dateStr = new Date(Number(date))
    if(dateStr == "Invalid Date" && new Date(date) == "Invalid Date"){
        res.json({error: "Invalid Date"})
    }else{
        const parsedDate = Date.parse(dateStr)
        res.json({unix: parsedDate, utc: dateStr.toUTCString()})
    }
})

app.get('/api', (req, res)=>{
    const now = new Date()
        res.json({unix: Date.parse(now), utc: now.toUTCString()})
})

app.listen(3000,()=>{
    console.log("Server Started!")
})