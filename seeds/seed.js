const sequelize = require('../config/connection');
//require all the models
const { User, Comment, Post } = require('../models');

//require the blog data
const postData = require('./postData.json');
//require the user data
const userData = require('./userData.json');
//require the user data
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    await Post.bulkCreate(postData, {
        returning: true,
    });
    await Comment.bulkCreate(commentData, {
        returning: true,
    });
    console.log("*********");
process.exit(0);
};
seedDatabase();