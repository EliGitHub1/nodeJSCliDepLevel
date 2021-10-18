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

for example:  dlevel --path ./HomeAssignment/package-lock.json --level 5

Example 2:

1. open git bash/cmd/or any integrated command line
2. cd nodeJSCliDepLevel/
3. run the following 

dlevel 

for example:  dlevel --path ./HomeAssignment/package-lock.json --level 5

Running dlevel with any flags:
yourfolderpath\ dlevel 







