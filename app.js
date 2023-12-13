const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const indexRoutes = require('./routes/index');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'seu-segredo', resave: true, saveUninitialized: true }));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', indexRoutes);


app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
