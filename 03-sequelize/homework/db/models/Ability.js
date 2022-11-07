const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ability', {
    name:{
      type:DataTypes.STRING,
      allowNull:false, // significa que es dato obligatorio
      unique: "index" // mismo string que mana cost para que combinen

    },
    description:{
      type:DataTypes.TEXT
    },
    mana_cost:{
      type:DataTypes.FLOAT,
      allowNull:false,
      unique: "index",
      validate:{
        min: 10.0,
        max: 250.0
      }
    },
    /* Virtual Field
    Ahora crearemos un campo virtual para el modelo de Ability que será como un mini resumen de la habilidad y lo llamaremos "summary", deberá retornar "{name} (name({mana_cost} points of mana) - Description: ${description}" (La mana tienen que ser solo la parte entera). */
    summary:{
      type:DataTypes.VIRTUAL,
      get(){
        return `${this.name} (${Math.trunc(this.mana_cost)} points of mana) - Description: ${this.description}`
      }

    }

  })
}