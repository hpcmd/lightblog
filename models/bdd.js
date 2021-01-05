var mongoose = require('mongoose');
var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
   
        useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://hugo:hugohugo@cluster0.jzq0u.mongodb.net/nestedblog?retryWrites=true&w=majority',
    options,    
    function(err) {
     console.log(err);
    }
   );



   