
var mongoose = require('mongoose');
var commentSchema = mongoose.Schema({
    description:String,
    commentAuthor:String,
    commentDatePublication:Date
})

var postSchema = mongoose.Schema({
    title:String,
    content:String,
    category:String,
    datePublication:Date,
    author:String,
    image:String,
    commentaires:[commentSchema]
});

var postModel = mongoose.model('posts', postSchema);
module.exports = postModel;