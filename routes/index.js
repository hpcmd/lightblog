var express = require('express');
var router = express.Router();
var postModel = require('../models/post');
var request = require('sync-request'); //getting API unsplash access

//starting with creation of content

router.get('/', function(req, res, next) {
  // var queryPhoto = request("GET", "https://api.unsplash.com/search/photos?query=jeux-videos&fit=crop&client_id=bvLcBsY7B9y43773KumKpUWuFU6ec1Rv6hYzHyiMB3o&page=4&h=200");
  // queryPhotoJSON = JSON.parse(queryPhoto.body)
  // i=parseInt(Math.random()*10)
  // photo=queryPhotoJSON.results[i].urls.thumb
  // photoArray=[]
  // for(var i=0;i<10;i++){
  // photoArray.push(queryPhotoJSON.results[i].urls.thumb)
  // }
  res.render('admin/create', { title: 'Express' });
});

router.post('/add-post', async function(req, res, next) {
  //creating a way to get photo from Unsplash corresponding to the categoey
  var queryPhoto = request("GET", `https://api.unsplash.com/search/photos?query=${req.body.category}&client_id=bvLcBsY7B9y43773KumKpUWuFU6ec1Rv6hYzHyiMB3o`);
  queryPhotoJSON = JSON.parse(queryPhoto.body)
  //picking randomly the image corresponding to the article
  i=parseInt(Math.random()*10)
  unsplashResult=queryPhotoJSON.results[i].urls.full

  var newPost= new postModel({
    title:req.body.nameArticle,
    content:req.body.content,
    category:req.body.category,
    datePublication:new Date(),
    author:req.body.nameAuthor,
    image:unsplashResult,
    //subdocument to display comments on a given article
    commentaires:[{}]
  })

  var postSaved = await newPost.save();

 res.redirect('getpost')
});

router.post('/add-comment', async function(req, res, next) {
  var post= await postModel.findById(req.body.id)
  //pushing the comment into the subdocument corresponding to the specific article
    post.commentaires.push(
    {description:req.body.contentComment,
    commentAuthor:req.body.nameAuthorComment,
    commentDatePublication:new Date()})
    var commentSaved = await post.save();

  res.redirect('back')
});

router.get('/getpost', async function(req, res, next) {
  var categories = await postModel.find().distinct('category')
  var post = await postModel.find().sort({datePublication:-1})
  res.render('displaypost/allarticles', {post,categories});

});

router.get('/getspecificpost', async function(req, res, next) {
  var categories = await postModel.find().distinct('category')
  var post= await postModel.findById(req.query.id)
  res.render('displaypost/detailpost', {post,categories,comment:post.commentaires})
})

router.get('/getcategory', async function(req, res, next) {
  var categories = await postModel.find().distinct('category')
  var post= await postModel.find({'category':req.query.name}).sort({datePublication:-1})
  res.render('displaypost/categorypost', {post,categories})
})

router.get('/getauthor', async function(req, res, next) {
  var categories = await postModel.find().distinct('category')
  var post= await postModel.find({'author':req.query.name}).sort({datePublication:-1})
  res.render('displaypost/authorpost', {post,categories})
})


router.get('/admin-show-post',async function(req, res, next){
  var post = await postModel.find();
  res.render('admin/admin-posts',{post})
})

router.get('/edit-post', async function(req, res, next) {
  var editPost = await postModel.findById({_id:req.query.id})
    res.render('admin/edit',{editPost})
});

router.get('/delete-post', async function(req, res, next) {
  var deletePost = await postModel.deleteOne({_id:req.query.id})
    res.redirect('admin-show-post')
});

router.post('/submit-edit-post', async function(req, res, next) {
  var post = await postModel.find();
  var editPost = await postModel.updateOne({_id:req.body.idPostEdit},{
    title:req.body.nameArticle,
    content:req.body.content,
    category:req.body.category,
    author:req.body.nameAuthor,
    // image:unsplashResult, we are not yet allowing the user to pick manually his photo
    });
    res.redirect('admin-show-post')
});



module.exports = router;
