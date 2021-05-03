const Comment = require('./comment');
const Post = require('./Post');
const User = require('./User');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete:'CASCADE',
});
User.hasMany(Comment, {
    foreignKey: 'user_id',
});
Post.belongsTo(User, {
    foreignKey: 'user_id'
});
Post.hasMany(Comment, {
    foreignKey: 'user_id'
});

module.exports = { User, Post, Comment };