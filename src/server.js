require('dotenv').config();
const rescue = require('express-rescue'); 
const app = require('./api');

const loginValidate = require('./middlewares/loginValidate');
const loginControllers = require('./controllers/loginControllers');
const errorMiddleware = require('./middlewares/error');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

app.post('/login', loginValidate, rescue(loginControllers.validateLogin));

app.use(errorMiddleware);

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log('ouvindo porta', port));
