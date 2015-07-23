// require mongoose
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Thought = require('./thought'); 


// define pauri schema
var PauriSchema = new Schema({
  pid: Number,
  gurmukhi: String,
  
  thoughts: [Thought.schema]

});

// create and export Pauri model
var Pauri = mongoose.model('Pauri', PauriSchema);
module.exports = Pauri;



