//dependencies
const restful = require('node-restful');
const mongoose = restful.mongoose;

const QuanSchema = new mongoose.Schema({
	tenquan : String,
   	khuvuc : String
})
module.exports = restful.model('quan',QuanSchema);