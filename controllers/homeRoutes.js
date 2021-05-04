const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log("req.session", req.session);
    res.render('home', {
      posts
    });
  } catch (err) {
    console.log('***', err)
    res.status(500).json(err);
  }
});
//login route
router.get('/login', (req, res) => {
  console.log("***ITWORKS!!!", req.session);
  if (req.session.loggedIn) {
    //re-direct to root if not logged in
    res.redirect('/');
    return;
  }
  //render the login handlebars
  res.render('login');
});
//get post by id
router.get('/post/:id', async (req, res) => {
  console.log('**** post route')
  //get posts by id
  try {
    const postData = await Post.findOne({
      //include comments and user attributes
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
        },
        {
          model: Comment,
          include: {
            model: User,
          },
        },
        // {
        //   model: User,
        //   attributes:['username']
        // },
      ],
    });
    console.log(postData)
    console.log('***')
    const post = postData.get({ plain: true });
    console.log("testing post")
    console.log(post)
    //render the comment handlebars
    res.render('comment', {
      post
    });
  } catch (err) {
    console.log(err);
    console.log("error***")
    res.status(500).json(err);
  }
});

module.exports = router;
