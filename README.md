nodeJSCliDepLevel
___________________
CLI that will identify all NPM dependencies at a given level


Installation 
___________________
1. git clone this repository
2. install update node runtime, you can find more information here: https://nodejs.org/en/
3. open git bash/cmd/or any integrated command line
4. go to nodeJSCliDepLevel 
5. npm install
6. npm i esm
7. npm install arg
8. npm install inquirer


Examples\use cases
___________________
The command-line utility name is “dlevel"

Example 1:

1. open git bash/cmd/or any integrated command line
2. cd nodeJSCliDepLevel/
3. run the following 

        dlevel --path [relative or absoulut package-lock.json file location on your file system] --level [integer to specify which level do you want to print]
    

for example:  

        dlevel --path ./HomeAssignment/package-lock.json --level 5
    
result:

    INFO Accessable package-lock.json file found
    Level 5:                                         end-of-stream@1.4.4
    Level 5:                                         once@1.4.0

Example 2:

    dlevel 

for example:  

    dlevel
    
result:

    INFO Accessable package-lock.json file found
    INFO No packages property found in package-lock.json

explantaion:  
dlevel can't parse package-lock.json file with the property "packeges"
for further reading about "packages" visit: https://docs.npmjs.com/cli/v7/configuring-npm/package-lock-json#packages

Example 3:

    dlevel --path ./HomeAssignment/package-lock.json 
    
result:
  
    INFO Accessable package-lock.json file found
    INFO level is set to: all the root package dependencies
    Level 0: cli-lock-example@1.0.0
    Level 1:         got@11.8.2
    Level 2:                 @sindresorhus/is@4.2.0
    Level 2:                 @szmarczak/http-timer@4.0.6
    Level 2:                 @types/cacheable-request@6.0.2
     .
     .
     .
     level n: ....
 
 explanation:
 not speifying a level reslut in printint the all root package dependencies
 
 








