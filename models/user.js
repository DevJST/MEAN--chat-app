var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    nickname: {
        type: String,
        required: true,
        unique: true
    }
});