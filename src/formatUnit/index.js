'use strict'
const numeral = require('numeral')

const GetMods = require('./getMods')
const GetRelicStats = require('./getRelicStats')
const GetUnitSkills = require('./getUnitSkills')
const GetUnitStats = require('./getUnitStats')
const SpecStats = require('./specStats')

module.exports = async(uInfo, unit = {})=>{
  try{
    if(uInfo){
      const res = {
        nameKey: uInfo.nameKey,
        baseId: uInfo.baseId,
        level: (unit.currentLevel || 0),
        rarity: (unit.currentRarity || 0),
        gp: numeral((unit.gp || 0)).format('0,0'),
        combatType: uInfo.combatType,
        thumbnailName: uInfo.thumbnailName,
        portrait: uInfo.portrait,
        stats: {},
        damage: [],
        specStat: {info:[]},
        zeta: []
      }
      if(unit?.stats){
        res.stats = await GetUnitStats(unit.stats, uInfo.combatType)
        res.damage = await HP.GetAbilityDmg(unit, uInfo)
        res.specStats = await SpecStats(unit)
      }
      if(uInfo.combatType == 1){
        if(unit?.stats){
          res.gear = {
            color: HP.enum.gearColors[unit.currentTier],
            value: 'G'+unit.currentTier
          }
          res.unitMods = await GetMods(unit.equippedStatMod)
          res.skills = await GetUnitSkills(unit, uInfo)
          if(unit.relic.currentTier > 2){
            res.gear.value = 'R'+( (+unit.relic.currentTier) - 2 )
          }
          res.addStats = await GetRelicStats(unit)
        }else{
          res.gear = {
            color: HP.enum.gearColors[0],
            value: 'G0'
          }
          res.addStats = []
        }
      }
      return res
    }
  }catch(e){
    console.error(e);
  }
}
