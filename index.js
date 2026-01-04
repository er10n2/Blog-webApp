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


let posts = [
  {
    postId: uuidv4(),
    postTitle: "David Fincher's 'Se7en' Movie",
    postContent: "Released in 1995, Se7en remains a masterclass in tension, atmospheric world-building, and psychological horror. Directed by David Fincher, the film stars Morgan Freeman as Detective William Somerset—a weary, literate veteran just days away from retirement—and Brad Pitt as David Mills, a cocky, impulsive detective who recently transferred into the city. The dynamic between Freeman’s calm, methodical approach and Pitt’s 'all-balls-no-brains' energy creates a brilliant friction that drives the story forward.\n\nThe film follows the duo through a nameless, rain-soaked city as they track 'John Doe,' a serial killer who views himself as a divine messenger. Doe’s crimes are grotesque, literal interpretations of the seven deadly sins: Gluttony, Greed, Sloth, Lust, Pride, Envy, and Wrath. What makes the movie truly haunting isn't just the gore—which Fincher famously keeps mostly off-screen—but the oppressive sense of apathy that Somerset struggles with daily.\n\nFrom the flickering opening credits to the scorched, desert-set finale, the cinematography uses deep shadows and a muted color palette to make the city feel like a character itself. The ending, involving a delivery van and a cardboard box, is widely considered one of the most shocking climaxes in cinema history, forcing the audience to confront the same impossible choice as Detective Mills. Even decades later, Somerset’s final line—agreeing that the world is worth fighting for—serves as the perfect, somber ending to a film that refuses to offer easy answers.",
    date: new Date().toLocaleTimeString()
},
    
    {
        postId: uuidv4(),
        postTitle: "Welcome to my Blog!",
        postContent: "This is a dummy post created to show you how the layout looks. You can edit or delete this anytime.",
        date: new Date().toLocaleTimeString()
    },
    {
        postId: uuidv4(),
        postTitle: "The Power of REM Units",
        postContent: "Using 62.5% for your HTML font-size makes calculating pixels to rem super easy. 1rem becomes 10px!",
        date: new Date().toLocaleTimeString()
    },
    {
        postId: uuidv4(),
        postTitle: "Node.js and EJS",
        postContent: "EJS is a great templating engine for generating HTML markup with plain JavaScript.",
        date: new Date().toLocaleTimeString()
    }];




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





app.get('/read/:id', (req,res)=>{

     const postt = req.params.id;

    const postToRead = posts.find(function(post){
        return  post.postId === postt;
    })


    if(postToRead){

        res.render('read', {
            readPost : postToRead,
        })


    }else{
        res.redirect('/');
    }


});






app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

