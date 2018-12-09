const express = require('express');
const models = require('../models');

const router = express.Router();

router.get('/movies', (req, res)=>{
  models.Frame.findAll().then(function(users){
    res.send(users);
  });
});

module.exports = router;
