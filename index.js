import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import session from 'express-session';
import flash from 'connect-flash';

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());


let posts = [];




app.get('/', (req, res) =>{

    res.render('home' , {
        
        allPosts:posts,
        successMsg: req.flash('success'),
        errorMsg: req.flash('error')
    
    });

});




app.get('/create', (req, res)=>{

    res.render('create');
})


app.post('/submit', (req, res)=>{

    const post = {
        postId: uuidv4(),
        postTitle : req.body['title'],
        postContent : req.body['content'],
        date: new Date().toLocaleTimeString(),
    }

    posts.push(post);
    console.log(posts);

    res.redirect('/');

})


app.post('/deletePosts/:id', (req, res)=>{

    const idToDelete = req.params.id;

    posts = posts.filter(post => post.postId !== idToDelete);

    req.flash('success', 'Post deleted Successfully')

    res.redirect('/');


})




app.get('/edit/:id', (req,res)=>{


    const postID = req.params.id;

    const postFound = posts.find(function(post){
        return post.postId === postID;
    })

    if(postFound){
  res.render('editPost' , {post: postFound});
        
    }else{
        req.flash('error', "no post was found with that id!");
        res.redirect('/');
    }

  

})



app.post('/update/:id', function(req, res){

    const postId = req.params.id;

    const postToUpdate = posts.find(function(post){

        return post.postId === postId;
    })


    if (postToUpdate) {
    postToUpdate.postTitle = req.body['title'];
    postToUpdate.postContent = req.body['content'];

    req.flash('success', 'Post updated successfully!');
    res.redirect('/');

    console.log(postToUpdate);
    }else{
        res.redirect('/');
      req.flash('error', 'Post not found!');
    }

})






app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

