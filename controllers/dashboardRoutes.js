const router = require('express').Router();
const { Post, User, Comment } = require('../models/');
const withAuth = require('../utils/auth');

//get all post from the current user        //THIS ROUTE WORKS
router.get('/', withAuth, async (req, res) => {
  console.log("route is hit dashboard");

    // const postData = await Post.findAll({});

    // const posts = postData.map((post) => post.get({ plain: true }));

    // console.log("*******",posts);

    // res.render('dashboard', { posts: posts});
  try {
    const postData = await Post.findAll({
      where: { userId: req.session.userId }
    });

    console.log("postData------------",postData)

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log("posts------------", posts);
    res.render('dashboard', { posts: posts});

  } catch (err) {
    console.log('***', err)
    res.redirect('login');
  }
});
//login route                         //THIS ROUTE WORKS
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    //re-direct to root if not logged in
    res.redirect('/');
    return;
  }
  //render the login handlebars
  res.render('login');
});

//Get dashboard post by id           //PAGE REDIRECTS TO LOGIN //ROUTE WORKS
router.get('/update/:id', withAuth, async (req, res) => {
  try {
    //find post by primary key
    const postData = await Post.findByPk(req.params.id);

    const post = postData.get({ plain: true });
    //render the updatePost 
    res.render('updatePost', { post })
    //re-direct to login
  } catch (err) {
    res.redirect('login')
  }
});
module.exports = router;