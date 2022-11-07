const { Router } = require('express');
const { Ability } = require('../db');
const router = Router();

router.post("/", async (req,res)=>{
    try {
        const {name,mana_cost} = req.body
        if(!name || !mana_cost)return res.status(404).send("Faltan enviar datos Obligatorios")
        const abiliti = await Ability.create(req.body)
        res.status(201).json(abiliti)
    }
    catch(e){
        res.status(500).send("Algo salio mal en el proceso")
    }
})

router.put("/setCharacter", async(req,res)=>{
    const {idAbility,codeCharacter} = req.body
    try{
        let ability = Ability.findByPk(idAbility)
        await ability.setCharacter(codeCharacter)
        let result = await Ability.findByPk(idAbility,{
            attributes: ["name", "description", "mana_cost", "CharacterCode"]
        })
        res.status(201).json(result)
    }
    catch(e){
        console.log(e)
    }
})

module.exports = router;