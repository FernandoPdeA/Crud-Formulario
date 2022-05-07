criar uma tabela de usuarios
create table usuarios (
    id int auto_increment primary key,
    nome varchar(255) not null,
    sobrenome varchar(255) not null,
    email varchar(255) not null,
    senha varchar(255) not null,
    confirmaSenha varchar(255) not null
)

inserir dados na tabela
insert into usuarios (nome, sobrenome, email, senha, confirmaSenha) values ('Fernando', 'Andrade', 'pupygreen@gmail.com', 'insira a sua senha', 'consfirmação de senha')
