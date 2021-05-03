const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log("req.session",req.session);
    res.render('home', { posts
    });
  } catch (err) {
    console.log('***', err)
    res.status(500).json(err);
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
  //get post by id
router.get('/post/:id', async (req, res) => {
  //get posts by id
  try {
    const postData = await Post.findByPk(req.params.id, {
      //include comments and user attributes
      include: [
        {
          model: Comment,
          attributes: ['body'],
        },
        {
          model: User,
          attributes:['username']
        },
      ],
    });

    const post = postData.get({ plain: true });
    //render the comment handlebars
    res.render('comment', {
      post
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
