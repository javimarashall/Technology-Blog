const router = require('express').Router();
const { User } = require('../../models');

//create a new user                  --------THIS ROUTE WORKS-------------          
router.post('/', async (req, res) => {
    console.log("********hit", req.session);
    try {

        const newUser = await User.create({
            //set the username to user input of username
            username: req.body.username,
            //set the password to the user input password
            password: req.body.password,
        });
        req.session.save(() => {
            //save the new username as username
            req.session.username = newUser.username;
            //save the logged in session
            req.session.loggedIn = true;
            //save the session with a user if
            req.session.userId = newUser.id;

            res.json(newUser);
        });
       
    } catch (err) {
        console.log("******",err);
        res.status(500).json(err);
    }
});

//login route for user                        -------THIS ROUTE WORKS------------      
router.post('/login', async (req, res) => {
    try {
        //find one where the username matches the entered username
        const userData = await User.findOne({ where: { username: req.body.username }, });

        console.log("userData------------",userData);
        //username does not match
        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }
        //check password
        const validPassword = userData.checkPassword(req.body.password);

        console.log("validPassword------------",validPassword);

        //password does not match
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        console.log("req.session exists?------------",req.session);

        //if login credentials match, display this message
        req.session.save(() => { //saves the session 
            req.session.username = userData.username;
            //save the session and set as true 
            req.session.loggedIn = true;
            //save the session
            req.session.userId = userData.id;
            //if successful, display message

            console.log("req.session------------",req.session);
            res.json({ userData, message: 'You are now logged in!' });
        });
        //catch an error if there's one
    } catch (err) {
        res.status(400).json({ message: 'No user found' });
    }
});
//logs the user out                 -----I GET A 204 MESSAGE ON INSOMNIA----- ---SO I THINK THIS ROUTE WORKS-------
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        //destroy the current session
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
