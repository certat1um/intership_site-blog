import express from 'express';
const methodOverride = require('method-override');

const path = require('path');
const singleRoutes = require('./routes/single-routes');
const errorRoutes = require('./routes/error-routes');
const postRoutes = require('./routes/post-routes');
const postAPIRoutes = require('./routes/api-post-routes');

const app = express();

const PORT = 3000;

app.listen(PORT, 'localhost', () => {
  console.log('Server is running...');
});

app.set('view engine', 'ejs');
// @ts-ignore
app.use(express.urlencoded({ extended: 'false' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(singleRoutes);
app.use(postRoutes);
app.use(postAPIRoutes);
app.use(errorRoutes);
