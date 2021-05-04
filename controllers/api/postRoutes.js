const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//show all post            -----------THIS ONE REDIRECTS TO LOGIN PAGE, SO IT WORKS------
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
                                            //------Route WORKING-----

router.delete('/:id', withAuth, async (req, res) => {
  
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
      console.log(postData)
      console.log('***')
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //update post
  router.put('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.update({
        where: {
          id: req.params.id,
        },
      });
      console.log(postData)
      console.log('***')
      if (!postData) {
       res.status(200).json(postData)
        
      } else {
        res.status(404).json({ message: 'No post found with this id!' });
      }  
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;