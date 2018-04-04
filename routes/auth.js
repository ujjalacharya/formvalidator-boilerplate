var express = require('express');
var router = express.Router();
var passport = require('passport');



router.route('/login')
    .get((req, res, next)=>{
        res.render('login', { title: 'Please login' })
    })
    .post(passport.authenticate('local', {
        failureRedirect: '/login'
    }), (req, res)=>{
        res.redirect('/');
    }
)


router.route('/register')
    .get((req, res, next) => {
        res.render('register', { title: 'Please register you information' })
    })
    .post((req, res, next) => {
        req.checkBody('name', 'Empty Name').notEmpty();
        req.checkBody('email', 'Invalid Eamil').isEmail();
        req.checkBody('password', 'Empty Password').notEmpty();
        req.checkBody('password', 'Password do not match').equals(req.body.confirmPassword).notEmpty();

        let errors = req.validationErrors();
        if (errors) {
            res.render('register', {
                name: req.body.name,
                email: req.body.email,
                errorMessages: errors
            });
        } else {
            let user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.setPassword(req.body.password);
            user.save((err) => {
                if (err) {
                    res.render('register', { errorMessages: err })
                } else {
                    res.redirect('/login');
                }
            })
        }

    })

router.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/')
})

module.exports = router;