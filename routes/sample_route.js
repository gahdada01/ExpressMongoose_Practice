var express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

router.use(function timeLog(req, res, next){
    console.log("Time: " + Date.now() + " Query");
    next();
});

// ROUTER FOR STAFF

router.get('/', function(req, res){
    Sample.getUsers(function(err, users){
        if(err){
            res.json({"data":err.message, "success": false});            
        }
        res.json({'data': users, "success":true});
    });
})

router.get('/:_name/:_branch', function(req, res){
    var name = req.params._name;
    var branch = req.params._branch;

    Sample.getUsersByName(name, branch, function (err, username){
        if(err){
            res.json({"data":null, "success": false, "message":err.message}); 
        }
        res.json({'data': username});
    });
    
});

router.post('/', function(req, res, next){
    var sampleBody = req.body.sampleObject;
    Sample.addSample(sampleBody, function(err, sample){
        if(err){
            res.json({"data":err.message, "success": false});
        }
        res.json({"data":sample, "success":true});
    });    
})

module.exports = router;