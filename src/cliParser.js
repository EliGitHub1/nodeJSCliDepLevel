import arg from 'arg'
import inquirer from 'inquirer'
import chalk from 'chalk';
import fs from 'fs'
import {printSpesificLevelDependencies} from './cliPrinter'

const parser = require('../HomeAssignment/dependency_parser')
const PRINT_ALL = -1

 const parseArgsIntoOptions=(rawArgs)=>{  
    const args = arg(
      {
        '--yes':Boolean,
        '--path': String,
        '--level':Number,   
        '-y':'--yes',
        '-p': '--path',
        '-l':'--level',   
      },
      {
        argv: rawArgs.slice(2)
      }      
    )
    return {
      skipProm: args['--yes'] || false,
      path: args['--path'] || process.cwd().concat('\\package-lock.json'),
      level: args['--level'],
    };
 }


 const isPackagesPropExist = path=>{  
  return new Promise(resolve=>{                 
      const rawdata = fs.readFileSync(path);
      let lockfile = JSON.parse(rawdata);      
      if (lockfile.packages===undefined)
         return resolve(false)
      return resolve(true)        
  })
}

const validatePathInput =async path=>{  
  return new Promise(resolve=>{
    fs.access(path, fs.constants.R_OK,(err) => {        
        if (err){
          return resolve(false)          
        }else{
          return resolve(true)                              
      }})        
  })
}
  const validateLevelInput = levelInput=>{     
    switch (true) {
      case levelInput===undefined:                
        console.info('%s level is set to: all the root package dependencies', chalk.yellow.bold('INFO'));
        return PRINT_ALL;
      case typeof(levelInput)!=='number':
      case isNaN(levelInput):
      case levelInput<0:
        console.error('%s Did not enter valid --level input', chalk.red.bold('ERROR'));
        process.exit(1)      
      default:
        return levelInput
    }    
  }


  const processLevel = (levelInput,level)=>{
    return new Promise(resolve=>{
      switch (true) {    
        case levelInput===PRINT_ALL:                  
          parser.printLevelDependencies()
          return resolve('Finished parsing all levels')          
        case levelInput>Object.keys(level).length:          
          console.info('%s --level input is bigger than max', chalk.yellow.bold('INFO'));
          return resolve('Finished without parsing')                          
        case levelInput===0:
          console.log(`Level 0: `+(level[0])[0].name+`@`+(level[0])[0].version)
          return resolve('Finished parsing root')          
        default:                                
        let newLevel = Object.keys(level).reduce((acc, key) => {
          if (parseInt(key) === levelInput) {
              acc[key] = level[key]
          }
          return acc
      }, {})    
      printSpesificLevelDependencies(newLevel)
      return resolve(`Finished parsing level ${levelInput}`)          
      }
    })    
  }


  
 export const cli= async args=> {
      let options = parseArgsIntoOptions(args)            
      
      let validPathRes = await validatePathInput(options.path)            
      if (!validPathRes){
        console.error('%s No accessable package-lock.json file found', chalk.red.bold('ERROR'));
        process.exit(1)
      }else{
        console.info('%s Accessable package-lock.json file found', chalk.yellow.bold('INFO'));
      }

      let resPackagesProp = await isPackagesPropExist(options.path)                    
      if (!resPackagesProp){
        console.info('%s No packages property found in package-lock.json', chalk.yellow.bold('INFO'));
        process.exit(1)
      }
              
      let validateLevel = validateLevelInput(options.level)
      let level =parser.getLevelDependencies(options.path)

      const result = await processLevel(validateLevel,level)
      console.info('%s', chalk.green.bold('DONE'),result);      
      process.exit(1)      
    }  
 