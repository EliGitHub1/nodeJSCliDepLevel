import fs from 'fs';

const isPackagesPropExist = path=>{  
  return new Promise(resolve=>{                 
      const rawdata = fs.readFileSync(path);
      let lockfile = JSON.parse(rawdata);
      const pName =packageName === "" ? packageName : `node_modules/${packageName}`
      if (lockfile.packages[pName]===undefined)
         return resolve(false)
      return resolve(true)        
  })
}

module.exports ={
  isPackagesPropExist
}


