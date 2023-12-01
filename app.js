const express = require('express')
const app = express()

app.use(express.json())

app.get('/api/:date?', (req, res)=>{
    const date = parseInt(req.params.date)
    if(!date){
        const now = new Date()
        res.json({unix: Date.parse(now), utc: now.toUTCString()})
    }else if (date % 1 === 0){
        const dateStr = new Date(date)
        res.json({unix: date, utc: dateStr.toUTCString()})
    }else{
        const parsedDate = Date.parse(date)
        if(parsedDate !== NaN){
            res.json({unix: parsedDate, utc: new Date(date)})
        }else{
            res.json({error: "Invalid Date"})
        }
    }
})

app.listen(3000,()=>{
    console.log("Server Started!")
})