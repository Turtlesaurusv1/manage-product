const path = require('path');

// This will give you the absolute path of the current working directory
const currentPath = path.resolve();

// This will join two paths together to create an absolute path
const myPath = path.join(__dirname, 'database', 'entities', );

console.log(currentPath); // Output: C:\Users\YourUser\MyProject
console.log(myPath); // Output: C:\Users\YourUser\MyProject\myFolder\myFile.js
