create database turno;

Use turno;

create table usuario(
DNI varchar(10) not null,
Nombre varchar(30) not null,
Apellido varchar(20) not null,
Edad varchar(2) not null,
Direccion varchar(50) not null,
Telefono varchar(50) not null,
Email varchar(50) not null,
Contraseña varchar(10) not null,
primary key(DNI)
);

create table horario(
idTurno int not null auto_increment,
Fecha timestamp default current_timestamp,
Horario varchar(5) not null,
fkDNI varchar(10) not null,
primary key(idTurno),
foreign key(fkDNI) references usuario(DNI)
);

insert into usuario values('20632965', 'Franco', 'Maldonado', '34', 'Salta 33', '3854876987', 'franco@gmail.com', '32632');
insert into usuario values('20632978', 'Osvaldo', 'Piaf', '24', 'Formosa 187', '3854876942', 'osvaldo@gmail.com', 'de32632');
insert into usuario values('20632914', 'Matias', 'Sayago', '26', 'Chaco 12', '3854876962', 'matias@gmail.com', 'demo32632');

insert into horario values(null, '2021-07-14', '08:00', 20632965);
insert into horario values(null, '2021-07-14', '09:00', 20632978);
insert into horario values(null, '2021-07-14', '09:30', 20632914);
insert into horario values(null, '2021-07-15', '12:00', 20632965);
insert into horario values(null, '2021-07-15', '13:00', 20632978);
insert into horario values(null, '2021-07-15', '13:30', 20632914);
insert into horario values(null, '2021-07-16', '13:30', 20632965);
insert into horario values(null, '2021-07-17', '13:00', 20632965);

select * from horario;
select * from usuario;