const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

router.post("/", async (req,res)=>{
    const {code,name,hp,mana} = req.body
    if(!code||!name||!hp||!mana) return res.status(404).send("Falta enviar datos obligatorios")
    try{
        const character = await character.create(req.body)
        req.status(201).json(character)
    }
    catch (e){
        res.status(404).send("Error en alguno de los datos provistos")
    }
})

router.get('/', async(req,res)=>{
    const {race} = req.query

    try{
        if(!race){
            const character = await chararacter.finfAll()
            res.json(character)
        }else if(!age){
            const character = await chararacter.finfAll({
                where: race
            })
            res.json(character) 

        }else{
            const character = await character.findAll({
                where:{
                    race,
                    age
                }
            })
            res.send(character) 
        }
    }
    catch (e){console.log(e)}
})
/*otra forma de hacerrlo, y mas dinamico seria
router.get('/', async(req,res)=>{
    const {race, age} = req.query
    const condition = {}
    const where = {}
    if(race) where.race = race
    if(age) where.age = age
    condition.where = where

    const character = await character.findAll(condition)
    res.json(character)
})


    */
/*GET/character/young*/
router.get("/young", async(req,res)=>{
    try{
        const character = await character.findAll({
            where:{
                age:{[Op.lt]: 25}
            } /*donde parametro age es menor a 25, usando operador little,  */
        })
        res.json(character)
    }
    catch(e){
        console.log(e)
        res.status(500).send(e.msg)
    }
})

/*extracode por parametro
get.character/:code */
router.get("/:code",async(req,res)=>{
    const{code} = req.params
    const character = await character.findByPk(code)
    if(!code) return res.status(404).send(`El código ${code} no corresponde a un personaje existente`)
    res.json(character)
})


/*PUT /character/addAbilities
Similar al enpodint anterior pero ahora queremos poder desde el lado del personaje agregar una o mas habilidades en simultaneo que las recibiremos como un array dentro del body del request: */
router.put("/addAbilities",async (req,res)=>{
    const {codeCharacter, abilities} = req.body
    let character = await character.findByPk(codeCharacter)
    let abilitiesArray = abilities.map(el => character.createAbilitie(el))
    await Promise.all(abilitiesArray)
    res.status(201).json(character)
})



/*put/character/:attribute Vamos a crear un PUT el cual va a recibir un atributo como param y un value como query y deberá modificar todos los valores de dicho atributo con el valor dado para todas las instancias de personajes que existan en la base de datos y cuyo valor de ese atributo sea null.
Es decir si se hace un request PUT a /character/age?value=40 deberá buscar todos los personajes cuya edad sea null y a esos reemplazarlos por el valor 40.

Devolver simplemente un mensaje que diga 'Personajes actualizados'
 */
router.put("/:attribute",async(req,res)=>{
    const {attribute} = req.params
    const {value} = req.query

    await character.update({[attribute]:value},{where:{[attribute]:null}})
    /*update cambia un atributo por otro cuando el valor del atributo sea null */
    res.send("Personajes actualizados")
})

/*GET /characters/roles/:code
Crearemos otro endpoint para obtener todos los datos del personajes pero incluyendo también la información asociada a sus roles. Por ejemplo debería devolver algo así: */

router.get("/roles/:code",async(req,res)=>{
    let {code} = req.params
    let character = await Character.findByPk(code,{
        include : Role
    })
    res.json(character)
})





module.exports = router;