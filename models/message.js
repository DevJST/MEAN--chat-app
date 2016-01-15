var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    nickname: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});