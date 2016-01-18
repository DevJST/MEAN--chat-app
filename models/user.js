var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    nickname: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('User', UserSchema);