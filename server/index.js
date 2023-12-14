const express = require('express')
const cors = require('cors')
const mail  = require('nodemailer')
const path = require('path')
require('dotenv').config()

const mailtransport = mail.createTransport({
  service:"GMAIL",
  auth:{
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
})

const app = express()
app.set('PORT',process.env.PORT || 3000)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.resolve(__dirname,'../build')))

app.post('/sendemail',(req,res,next)=>{
  console.log(req.body)
  mailtransport.sendMail(
    {
      from:req.body.email,
      to:process.env.EMAIL,
      subject: "I have a job for you",
      text: `
Hi i'm ${req.body.name},
${req.body.message}`
    }).then(()=>{
            res.status(200).send("success")
          }).catch((err)=>{
            console.log(err)
            res.status(400).send("failed")
          })
})

app.use(function (req,res) {
  res.type("application/json")
  res.status(404)
  res.send("invalid")
})

app.use(function (req,res) {
  res.type("application/json")
  res.status(500)
  res.send("broken")
})

app.get('/*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'../build','../src/index.html'))
})

app.listen(app.get('PORT'),function () {
  console.log('server listening on port ',app.get('PORT'))
})
