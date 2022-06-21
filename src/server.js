require('dotenv').config();
const rescue = require('express-rescue');
const app = require('./api');

const userControllers = require('./controllers/userControllers');
const categoryControllers = require('./controllers/categoryControllers');

const loginValidate = require('./middlewares/loginValidate');
const newUserValidate = require('./middlewares/newUserValidate');
const tokenValidate = require('./middlewares/tokenValidate');
const categoryValidate = require('./middlewares/categoryValidate');
const errorMiddleware = require('./middlewares/error');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

app.post('/login', loginValidate, rescue(userControllers.validateLogin));
app.post('/user', newUserValidate, rescue(userControllers.addNewUser));
app.get('/user', tokenValidate, rescue(userControllers.getAllUsers));
app.get('/user/:id', tokenValidate, rescue(userControllers.getUserById));

app.get('/categories', tokenValidate, rescue(categoryControllers.getAllCategories));
app.post(
  '/categories',
  tokenValidate,
  categoryValidate,
  rescue(categoryControllers.addNewCategory),
);

app.use(errorMiddleware);

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log('ouvindo porta', port));
