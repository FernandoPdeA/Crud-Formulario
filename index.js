const express = require('express');
const path = require('path');
const mysql2 = require('mysql2');
const app = express();
const port = 3000;

//Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//View Engine
// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Conexão com o banco de dados
const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: '?',
  database: '?',
});

//Verificar se a conexão está ok
db.connect((err) => {
  if (err) {
    console.log(`Não foi possível conectar ao banco de dados: ${err}`);
  }
  var sql = 'SELECT * FROM usuarios';
  db.query(sql, (err, results) => {
    console.log(`Conectado ao banco de dados!...Quantidade de usuários = ${results.length}`);
  });
});

//Rota get para a página inicial
app.get('/', (req, res) => {
  res.render('index', {});
});

//Rota get para a página de cadastro
app.get('/cadastro', (req, res) => {
  res.render('cadastro', {});
});

//Rota post para a página de cadastro
app.post('/cadastro', (req, res) => {
  console.log('cadastro realizado com sucesso');
  let nome = req.body.nome;
  let sobrenome = req.body.sobrenome;
  let email = req.body.email;
  let senha = req.body.senha;
  let confirmaSenha = req.body.confirmaSenha;
  db.query("INSERT INTO usuarios (nome, sobrenome, email, senha, confirmaSenha) VALUES (?, ?, ?, ?, ?)", [nome, sobrenome, email, senha, confirmaSenha], (err, result) => { });
  //Voltando a página de inicial usando o redirect
  res.redirect('/');
});

//Rota que  exibe na tela os usuários cadastrados
app.get('/visualizar', (req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    res.render('visualizar', { usuarios: results });
  });
});

//Rota get para a página de atualização
app.get('/atualizar', (req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    res.render('atualizar', { usuarios: results });
  });
});

//Rota post para atualizar os dados do usuário
app.post('/atualizar', (req, res) => {
  let id = req.body.id;
  let nome = req.body.nome;
  let sobrenome = req.body.sobrenome;
  let email = req.body.email;
  let senha = req.body.senha;
  let confirmaSenha = req.body.confirmaSenha;
  db.query("UPDATE usuarios SET nome = ?, sobrenome = ?, email = ?, senha = ?, confirmaSenha = ? WHERE id = ?", [nome, sobrenome, email, senha, confirmaSenha, id], (err, result) => { });
  console.log("Atualização realizada com sucesso");
  //Voltando a página inicial usando o redirect
  res.redirect('/');
});


//Rota get para a página de exclusão
app.get('/deletar', (req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    res.render('deletar', { usuarios: results });
  });
});

//Rota post para excluir o usuário
app.post('/deletar', (req, res) => {
  let id = req.body.id;
  db.query("DELETE FROM usuarios WHERE id = ?", [id], (err, result) => { });
  console.log("Exclusão realizada com sucesso");
  //Permanecer na página de exclusão
  res.redirect('/deletar');
});

//Ouvindo na porta 3000
app.listen(port, () => console.log(`Aplicativo de exemplo ouvindo na porta = ${port}!`));