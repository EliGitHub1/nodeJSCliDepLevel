const printSpesificLevelDependencies=(levelDependencies)=>{
  let output = "";
  Object.keys(levelDependencies).forEach((level) => {
    levelDependencies[level].forEach((dep) => {
      output += `Level ${level}:${"\t".repeat(level)} ${dep.name}@${
        dep.version
      }\n`;
    });
  });
  console.log(output);
}


module.exports = {
  printSpesificLevelDependencies,
};



