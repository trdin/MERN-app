var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	'content': String,
	'timeCreated': Date,
	'postedBy': {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	'photo': {
		type: Schema.Types.ObjectId,
		ref: 'questions'
	}
});

module.exports = mongoose.model('comment', commentSchema);
