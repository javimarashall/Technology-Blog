const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
//const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');

//creates a new sequelize store 
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//sets up the express app
const app = express();
//sets up the port for deployment or local host
const PORT = process.env.PORT || 3001;

// sets up handlebars engine
const hbs = exphbs.create({});

//sets up sessions
const sess = {
  secret: 'Super secret secret',
  //cookie: {},
  //forces a session to be saved to the store 
  resave: false,
  //forces a session that is uninitialized to be saved
  saveUninitialized: false,
  //store: new SequelizeStore({
    //db: sequelize
  
};
//tells express to use routes
app.use(routes);
//tells express to use sess for the session
app.use(session(sess));

// tells express which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//creates a path to the public directory
app.use(express.static(path.join(__dirname, 'public')));
//parse content coming from the client
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//starts the server and syncs sequelize to database 
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening: ' + PORT));
});
