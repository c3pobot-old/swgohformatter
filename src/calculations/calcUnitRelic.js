'use strict'
module.exports = (obj)=>{
  try{
    const tempObj = {
      total: 0
    }
    for(let i in obj){
      if(obj[i].relic.currentTier > 2){
        tempObj.total++;
        const tempRelic = +obj[i].relic.currentTier - 2
        if(tempRelic > 4){
          if(tempObj[tempRelic]){
            tempObj[tempRelic]++;
          }else{
            tempObj[tempRelic] = 1
          }
        }
      }
    }
    return tempObj;
  }catch(e){
    console.error(e);
  }
}
