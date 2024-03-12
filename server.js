const express = require('express')
const cors = require('cors')
const mail  = require('nodemailer')
const path = require('path')
require('dotenv').config()

const mailtransport = mail.createTransport({
  service:"gmail",
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

app.use(express.static(path.resolve(__dirname,'dist/gabriel')))

app.post('/sendemail',(req,res,next)=>{
  console.log(req.body)
  let frm = `${req.body.name} <${req.body.email}>`
  mailtransport.sendMail(
    {
      from:frm,
      to:process.env.EMAIL,
      subject: "I have an offer",
      text: `
Hi i'm ${req.body.name},
${req.body.message}`
    }).then(()=>{
            res.status(200)
            res.type("application/json")
            res.json({ message: "success" })
          }).catch((err)=>{
            res.status(400)
            res.type("application/json")
            res.json({ message: "failed" })
          })
})

app.get('/*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'dist/gabriel/index.html'))
})

app.use(function (req,res) {
  res.type("text/plain")
  res.status(404)
  res.send("invalid")
})

app.use(function (req,res) {
  res.type("text/plain")
  res.status(500)
  res.send("broken")
})

app.listen(app.get('PORT'),function () {
  console.log('server listening on port ',app.get('PORT'))
})
