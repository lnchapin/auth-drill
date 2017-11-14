var express = require('express')
var router = express.Router()
var db = require('../db/api')
var bcrypt = require('bcrypt')

router.post('/signin', function(req, res, next){
  db.signIn(req.body.agentName)
  .then(function(agent){
      if (agent) {
        bcrypt.compare(req.body.password, agent.password, function (err, isMatch) {
          if (isMatch) {
            //token redirect
          } else {
            //error
          }
        })
      }
      else {
        res.render('index', { title: 'gClassified', message: 'Incorrect login. Contents will self destruct' })
      }
  })
})

router.post('/signup', function(req,res,next){
  let agentName = req.body.agentName

  bcrypt.hash(req.body.password, 13, function(err, hash){
    db.signUp(agentName, hash)
    .then(function(agent){
      if (agent.password === req.body.password) {
        res.render('index', { title: 'gClassified', message: 'Password Must Be Hashed. Government Secrets are at Stake!' })
      }
      else {
        res.render('index', { title: 'gClassified', message: 'Sign Up Successful' })
      }
    })
})
})

module.exports = router
