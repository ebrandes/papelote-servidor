module.exports = function(app , mongoose) {
   return mongoose.model('Users', {
    name : String
});
}