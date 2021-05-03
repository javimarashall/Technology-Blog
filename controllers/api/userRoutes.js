const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//login route for user
router.post('/login', async (req, res) => {
    try {
        //find one where the username matches the entered username
        const userData = await User.findOne({ where: { username: req.body.username }, });
        //username does not match
        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }
        //check password
        const validPassword = await userData.checkPassword(req.body.password);
        //password does not match
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }
        //if login credentials match, display this message
        req.session.save(() => { //saves the session 
            req.session.username = userData.username;
            req.session.logged_in = true;

            res.json({userData, message: 'You are now logged in!' });
        });
        //catch an error if there's one
    } catch (err) {
        res.status(400).json({message: 'No user found' });
    }
});
        //logs the user out
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        //destroy the current session
        req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;
  