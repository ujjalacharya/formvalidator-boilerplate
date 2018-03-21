var express = require('express');
var router = express.Router();

let nodemailer = require('nodemailer');
let config = require('../config');
let transporter = nodemailer.createTransport(config.mailer);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Basic Site' });
});

router.get('/about', (req, res, next)=>{
  res.render('about', {title: 'Ujjal Acharya'})
})

router.route('/contact')
  .get((req, res, next)=>{
    res.render('contact', {title: 'Ujjal Acharya'})
  })
  .post((req, res, next)=>{
    req.checkBody('name', 'Empty Name').notEmpty();
    req.checkBody('email', 'Invalid Email').isEmail();
    req.checkBody('message', 'Empty Message').notEmpty();
    let errors = req.validationErrors();
    
    if(errors){
      res.render('contact', {
        title: 'Basic Site',
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessage: errors
      })
    }else{
      let mailOptions = {
        from: 'BasicSite <no-reply basicsite@gmail.com>',
        to: 'bloodprince027@gmail.com',
        subject: 'You have got a new message from a visitor',
        text: req.body.message
      }
      transporter.sendMail(mailOptions, (err, info)=>{
        if(err){return console.log(err)}
      
      res.render('thank', {title: req.body.name})
      })
    }
  });


module.exports = router;
