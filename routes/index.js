var express = require('express');
var router = express.Router();

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
      res.render('thank', {title: "Thanks for the submission, We'll get back to you soon"})
    }

  })


module.exports = router;
