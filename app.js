const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors'); 
const enviarEmailRouter = require('./routes/enviarEmail');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');

const app = express();

// Configuração do mecanismo de visualização
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.get('/index', (req, res) => {
  res.render('index');
});
app.use('/users', usersRouter);
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});

// Rota para processar o envio do formulário de contato
app.use('/enviar-email', enviarEmailRouter);

app.use(express.static('public'));
// Captura erros 404 e encaminha para o manipulador de erros
app.use(function(req, res, next) {
  next(createError(404));
});

// Manipulador de erros
app.use(function(err, req, res, next) {
  // Define as variáveis locais, fornecendo apenas o erro em desenvolvimento
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderiza a página de erro
  res.status(err.status || 500);
  res.render('error');
});

// Iniciar o servidor
const PORT = 8080; // Definir a porta como 8080
app.listen(PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
