const { Sequelize, Op } = require('sequelize');
const modelCharacter = require('./models/Character.js');
const modelAbility = require('./models/Ability.js');
const modelRole = require('./models/Role.js');

const db = new Sequelize('postgres://postgres:22julio92@localhost:5432/henry_sequelize', {
  logging: false,
});

modelCharacter(db); //tabla
modelAbility(db); //tabla
modelRole(db); //tabla

const { Character, Ability, Role} = db.models;

Character.hasMany(Ability)
Ability.belongsTo(Character)

Character.belongsToMany(Role, {through: "Character_Role"})
Role.belongsToMany(Character, {through: "Character_Role"})

module.exports = {
  ...db.models,
  db,
  Op
}