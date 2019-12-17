let mongoose = require('mongoose');
let UserSchema = new mongoose.Schema({ //定义数据模型
    username: {
        type: String,
        unique: true
    },
    password: String

});
module.exports = mongoose.model('users', UserSchema);
