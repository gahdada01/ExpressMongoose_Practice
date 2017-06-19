var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name must not be empty"],
        unique: [true, "Name already exist"]
    },
    username: {
        type: String,
        required: [true, "Username must not be empty"],
        unique: [true, "Username already exist"]
    },
    email: {
        type: String,
        required: [true, "Email must not be empty"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Name must not be empty"],
        unique: [true, "Name already exist"]
    }
});

var User = module.exports = mongoose.model('User', userSchema);


// Add User
// module.exports.addUser = function(user, callback){
//     var newUser = new User({
//         name: user.name,
//         username: user.username,
//         email: user.email,
//         password: user.password
//     });

//     newUser.save(callback);

// }

module.exports.addUser = function(user, callback){
    var newUser = new User({
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password
    });

    newUser.save(callback);

}