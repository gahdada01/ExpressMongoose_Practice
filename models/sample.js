var mongoose = require('mongoose');

var sampleSchema = mongoose.Schema({
    name: {
        type: String
    },
    section: {
        type: String
    },
    branch: {
        type: String
    }
});

var Sample = module.exports = mongoose.model('SampleTest', sampleSchema);

module.exports.addSample = function(sampleCollection, callback){
    var newSample = new Sample({
        name: sampleCollection.name,
        section: sampleCollection.section,
        branch: sampleCollection.branch
    });

    newSample.save(callback);
};

// Get Staffs
module.exports.getUsers = function(callback, limit){
    console.log(callback);
    Sample.find().exec(callback);    
}

// Search username and branch
module.exports.getUsersByName = function(username, branchName, callback){
    Sample.find(
            { $and:  [
                        {name : {
                                $regex: username, 
                                $options: "-i"
                            }
                        }, 
                        { branch : branchName }
                ]
            }
        )
        .exec(callback);    
};