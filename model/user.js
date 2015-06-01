module.exports = function(app,mongoose) {
   var User = mongoose.model('Todo', {
    text : String
});
}