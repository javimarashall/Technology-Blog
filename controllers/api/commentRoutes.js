const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

//comment route                               //THIS ONE REDIRECTS TO LOGIN
router.post('/', withAuth, async (req, res) => {
    try {
        //create new comment
        const newComment = await Comment.create({
        ...req.body, 
        userId: req.session.userId,
      });   
      res.json(newComment);
    } catch (err) { //catch error
      res.status(500).json(err);
    }
  });

  module.exports = router;