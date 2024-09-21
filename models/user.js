const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    // username and password, passportLocalMongoose will automatically define those two.
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',userSchema);