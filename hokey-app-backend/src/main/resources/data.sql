insert into team (name) values ('HC Domynos');
insert into team (name) values ('ITEL SERVIS');
insert into team (name) values ('HC Shewci');

insert into player (name, number, team_id) values ('Martin Borl', 21, (SELECT id FROM team where name='HC Domynos'));
insert into player (name, number, team_id) values ('Marek Borovský', 23, (SELECT id FROM team where name='HC Domynos'));
insert into player (name, number, team_id) values ('Radoslav Bürgel', null, (SELECT id FROM team where name='HC Domynos'));
insert into player (name, number, team_id) values ('Miroslav Čermák', 88, (SELECT id FROM team where name='HC Domynos'));
insert into player (name, number, team_id) values ('Jan Jíša', 4, (SELECT id FROM team where name='HC Domynos'));
insert into player (name, number, team_id) values ('Jakub Kopáček', 55, (SELECT id FROM team where name='HC Domynos'));
insert into player (name, number, team_id) values ('Tomáš Meruna', 8, (SELECT id FROM team where name='HC Domynos'));
insert into player (name, number, team_id) values ('Marek Neumann', 1, (SELECT id FROM team where name='HC Domynos'));
insert into player (name, number, team_id) values ('Marek Niessner', 24, (SELECT id FROM team where name='HC Domynos'));
insert into player (name, number, team_id) values ('Lukáš Plaček', 62, (SELECT id FROM team where name='HC Domynos'));

insert into player (name, number, team_id) values ('Jan Andrijko', 86, (SELECT id FROM team where name='HC Shewci'));
insert into player (name, number, team_id) values ('Zdeněk Chodanič', 35, (SELECT id FROM team where name='HC Shewci'));
insert into player (name, number, team_id) values ('Jiří Dorňák', 55, (SELECT id FROM team where name='HC Shewci'));
insert into player (name, number, team_id) values ('Václav Dvořák', 13, (SELECT id FROM team where name='HC Shewci'));

insert into player (name, number, team_id) values ('Martin Bartek', 16, (SELECT id FROM team where name='ITEL SERVIS'));
insert into player (name, number, team_id) values ('Tomáš Duchan', 44, (SELECT id FROM team where name='ITEL SERVIS'));
insert into player (name, number, team_id) values ('Pavel Hlaváč', 77, (SELECT id FROM team where name='ITEL SERVIS'));
insert into player (name, number, team_id) values ('Ivo Hruška', 28, (SELECT id FROM team where name='ITEL SERVIS'));