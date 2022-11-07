const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Character', {
    code:{
      type: DataTypes.STRING(5),//5 es el num de caract. que acepta ese campo
      primaryKey: true,
      allowNull:false, // esto quiere decir que la propiedad es obligatoria
      
      /*Character - code: similar al name vamos a hacer que no pueda ser "HENRY" pero incluyendo cualquier variación/combinación de mayúsculas y minísculas (Armar un custom validator). */
      validate:{
          validateCode(value){
            if(value.toLowerCase()==="henry"){
              throw new Error ("Codigo Incorrecto")
            } 
          }
      }
    },
    name:{
      type:DataTypes.STRING,
      unique:true,
      allowNull:false,
      validate:{
        notIn:["Henry","SoyHenry","Soy Henry"]/*no incluya los siguientes elementos de array */
      }
    },
    age:{
      type:DataTypes.INTEGER,
      /*Getter 
      Vamos a definir un getter para el atributo age de los personajes, lo que queremos es que nos devuelva el valor de su edad pero concatenado con la frase 'years old' por lo que para un personaje que tenga 27 años nos debería devoler '27 years old'.
      IMPORTANTE: Esto hará que rompan algunos tests anteriores que esperaban solamente el valor, animate y arreglalos, ya sabes como funcionan los tests. */
      get(){
        let value = this.getDataValue("age")
        if(!value){return null}
        return value + " years old"
      }
    },
    race:{
      type:DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'),
      defaultValue:'Other'
    },
    hp:{
      type:DataTypes.FLOAT,
      allowNull:false
    },
    mana:{
      type:DataTypes.FLOAT,
      allowNull:false
    },
    date_added:{
      type:DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW // guarda fecha y hora del momento en que se guarda

    },
  }, {timestamps: false // impide la creacion de las ultimas dos columnas creadas por defecto
  })
}