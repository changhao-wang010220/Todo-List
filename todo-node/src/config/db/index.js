const mongoose = require('mongoose');

const hostName = "127.0.0.1";
const dbName = "todo";
const port = 27017;

async function connect() {
    try {
        await mongoose.connect(`mongodb://${hostName}:${port}/${dbName}`, {
            useNewUrlParser: true, // 避免“不建议使用当前URL字符串解析器”
            useUnifiedTopology: true, // 解决连接报错问题
        });
        console.log("successfully connected to mongoDB");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {connect};