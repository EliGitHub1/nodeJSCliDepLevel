const fs = require("fs");

module.exports = {
  getLevelDependencies,
  printLevelDependencies,
};

let levelDependencies = {};
let lockfile;

function addLevelDependency(level, packageName, packageData) {
  const name = packageName === "" ? packageData["name"] : packageName; // account for the root package name
  levelDependencies[level] = levelDependencies[level] || [];
  levelDependencies[level].push({
    name: name,
    version: packageData["version"],
  });
}

function getAllLevelDependenciesRecursivly(level, packageName) {
  const pName =
    packageName === "" ? packageName : `node_modules/${packageName}`; // account for the root package name

  const packageData = lockfile.packages[pName];
  addLevelDependency(level, packageName, packageData);

  if (packageData && packageData.dependencies) {
    Object.keys(packageData.dependencies).forEach((depName) =>
      getAllLevelDependenciesRecursivly(level + 1, depName)
    );
  } else {
    return levelDependencies;
  }

  return levelDependencies;
}

function getLevelDependencies(lockPath) {
  const rawdata = fs.readFileSync(lockPath);
  lockfile = JSON.parse(rawdata);
  return getAllLevelDependenciesRecursivly(0, "");
}

function printLevelDependencies() {
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
