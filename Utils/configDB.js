const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://huy123:123@cluster0.4lqzqzl.mongodb.net/Node-api?retryWrites=true&w=majority')
.then( () =>{
    console.log('Connected to MongoDB');
}).catch( (err) =>{
     console.log(err);
})

module.exports = mongoose;