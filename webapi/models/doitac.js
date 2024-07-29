//dependencies
var restful  = require('node-restful');
var mongoose = restful.mongoose;


//schema
var doitacSchema = new mongoose.Schema(
	{
		ten : String,
		url: String

	});

//return model
module.exports  =  restful.model('doitac', doitacSchema);

