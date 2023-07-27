'use strict'
const numeral = require('numeral')
const { CalcAllZeta, CalcUnitRelic, CalcUnitRarity, CalcUnitUlt } = require('./calculations')

module.exports = (unit, gObj, eObj)=>{
  try{
    const len = 7
    const obj = {
      name: unit.nameKey+' ('+gObj.length,
      value: '```autohotkey\n'
    }
    if(eObj) obj.name += ' vs '+eObj.length;
    if(unit.combatType == 1){
      const gRelic = CalcUnitRelic(gObj)
      if(eObj){
        const eRelic = CalcUnitRelic(eObj)
        if(gRelic.total > 0 || eRelic.total > 0){
          obj.value += 'Reliced     : '+numeral(gRelic.total).format("0,0").padStart(len, ' ')+' vs '+numeral(eRelic.total).format("0,0")+'\n'
        }
        for(let i=11;i>0;i--){
          if ((gRelic[i] && gRelic[i] > 0) || (eRelic[i] && eRelic[i] > 0)) {
            obj.value += 'R'+i.toString()+'          : ' +numeral(gRelic[i] || 0).format("0,0").padStart(len, ' ') + ' vs ' + numeral(eRelic[i] || 0).format("0,0") + '\n'
          }
        }
      }else{
        if(gRelic.total > 0){
          obj.value += 'Reliced     : '+numeral(gRelic.total).format("0,0")+'\n'
        }
        for(let i=11;i>4;i--){
          if (gRelic[i]) {
            obj.value += 'R'+i.toString()+'          : ' + numeral(gRelic[i]).format("0,0") + '\n'
          }
        }
      }
    	if(Object.values(unit.skills).filter(x=>x.zetaTier).length > 0){
    		const gZetaCount = CalcAllZeta(gObj, unit.skills)
    		let eZetaCount
    		if(eObj){
    			eZetaCount = CalcAllZeta(eObj, unit.skills)
    			obj.value += 'All Zeta\'s  : '+numeral(gZetaCount.all).format('0,0').padStart(len, ' ')+' vs '+numeral(eZetaCount.all).format('0,0')+'\n'
    			if(gZetaCount.some > 0 || eZetaCount.some > 0){
    			  obj.value += 'Some Zeta\'s : '+numeral(gZetaCount.some).format('0,0').padStart(len, ' ')+' vs '+numeral(eZetaCount.some).format('0,0')+'\n'
    			}
    		}else{
    		  obj.value += 'All Zeta\'s  : '+numeral(gZetaCount.all).format('0,0')+'\n'
    		  if(gZetaCount > 0){
    		    obj.value += 'Some Zeta\'s : '+numeral(gZetaCount.some).format('0,0')+'\n'
    		  }
    		}
    	}
    	let ultCount = 0
    	for (let i in unit.ultimate) {
    	 if (ultCount == 0) {
    	  obj.value += 'Ultimate    : '
    	  ultCount++
    	 }
    	 if (eObj) {
    	  obj.value +=numeral(CalcUnitUlt(gObj, i)).format('0,0').padStart(len, ' ') + ' vs ' + numeral(CalcUnitUlt(eObj, i)).format('0,0') + '\n'
    	 } else {
    	  obj.value += numeral(CalcUnitUlt(gObj, i)).format('0,0') + '\n'
    	 }
    	}
    }else{
     const gRarity = CalcUnitRarity(gObj, 5)
    if(eObj){
      const eRarity = CalcUnitRarity(eObj, 5)
      if(gRarity[7] > 0 || eRarity[7] > 0){
        obj.value += 'Seven Star   : '+numeral(gRarity[7]).format("0,0").padStart(len, ' ')+' vs '+numeral(eRarity[7]).format("0,0")+'\n'
      }
      if(gRarity[6] > 0 || eRarity[6] > 0){
        obj.value += 'Six Star     : '+numeral(gRarity[6]).format("0,0").padStart(len, ' ')+' vs '+numeral(eRarity[6]).format("0,0")+'\n'
      }
      if(gRarity[5] > 0 || eRarity[5] > 0){
        obj.value += 'Five Star    : '+numeral(gRarity[5]).format("0,0").padStart(len, ' ')+' vs '+numeral(eRarity[5]).format("0,0")+'\n'
      }
    }else{
      if(gRarity[7] > 0){
        obj.value += 'Seven Star   : '+numeral(gRarity[7]).format("0,0")+'\n'
      }
      if(gRarity[6] > 0){
        obj.value += 'Six   Star   : '+numeral(gRarity[6]).format("0,0")+'\n'
      }
      if(gRarity[5] > 0){
        obj.value += 'Five Star    : '+numeral(gRarity[5]).format("0,0")+'\n'
      }
    }

    }
    obj.value +="```"
    obj.name += ')'
    return obj
  }catch(e){
    console.log(e)
  }
}
