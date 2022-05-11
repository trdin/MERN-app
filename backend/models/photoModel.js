var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
	'name': String,
	'path': String,
	'postedBy': {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	'views': Number,
	'likes': Array,
	'comments': [{
		type: Schema.Types.ObjectId,
		ref: 'comment'
	}],
	'timeCreated': {
		type: Date,
	},
	'tags': Array,
	'reports': Array,
});

module.exports = mongoose.model('photo', photoSchema);
