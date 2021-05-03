const router = require('express').Router();
const { Post, User, Comment } = require('../models/');
const withAuth = require('../utils/auth');

//get all post from the current user
router.get('/', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
          where: {user: req.session.logged_in}
      });  
      const posts = postData.map((post) => post.get({ plain: true }));
      console.log("req.session",req.session);
      res.render('dashboard', 
      { posts
      });
    } catch (err) {
      console.log('***', err)
      res.redirect('login');
    }
  });
  //login route
  router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      //re-direct to root if not logged in
      res.redirect('/');
      return;
    }
    //render the login handlebars
    res.render('login');
  });

  //Get dashboard post by id
router.get('/update/:id', withAuth, (req, res) => {
    try {
        //find post by primary key
        const postData = await Post.findByPk(req.params.id);
        
        const post = postData.get({ plain: true });
        //render the updatePost 
        res.render('updatePost', { post }) 
        //re-direct to login
    }catch (err) {
        res.redirect('login')
    }
});
module.exports = router;