import arg from 'arg'


 const parseArgsIntoOptions=(rawArgs)=>{
    const args = arg(
      {
        '--yes':String,
        '--path': String,
        '--level':Number,       
      },
      {
        argv: rawArgs.slice(2)
      }
    )
    return {
      skipProm: args['--yes'] || false,
      path: args['--path'] || rawArgs[1],
      level: args['--level'] || false,
    };
 }

//  async const promptForMissingOptions =()=>{
   
//  }

 export const cli=(args)=> {
    let options = parseArgsIntoOptions(args)
    console.log(options)
 }
 