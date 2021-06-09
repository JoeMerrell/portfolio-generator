// var commandLineArgs = process.argv; // "process" is a global object that represents everything going on with this app
// // the argv property is an array that holds what was typed into the command line -- in this case it represents the indexes of Node.js and the executed file
// console.log(commandLineArgs);
// // console.log(process);


/////

// var profileDataArgs = process.argv.slice(2, process.argv.length); // ---- why is the .length here?
// console.log(profileDataArgs);


// But wait, if we want .slice() to return everything including the final index, why don't we write process.argv.slice(2, process.argv.length - 1);? It turns out .slice() returns everything from the first zero-based index we provide as the first argument up to but not including the zero-based index we provide as the second argument. So, to return through the last index in the array, we provide the length of the array as the second argument.

// This way, you don't actually manipulate process.argv, but rather create a new array based on the values from the third index and on.


///// FIRST SECTION ORIGIN

// const profileDataArgs = process.argv.slice(2, process.argv.length); // takes the elements entered into the terminal and makes them into the array
// console.log(profileDataArgs); // displays the array


// // Notice the lack of parentheses around the `profileDataArr` parameter?
// const printProfileData = profileDataArr => {
//     // This...
//   for (let i = 0; i < profileDataArr.length; i += 1) {
//     console.log(profileDataArr[i]);
//   }

//   console.log('================');

//   // Is the same as this...
//   profileDataArr.forEach((profileItem) => {
//     console.log(profileItem)
//   });
// };

//   printProfileData(profileDataArgs); // calls the function, which pulls the data from the first array variable, then logs it

// // var is function scoped and let is block scoped

//////////////////////



// const profileDataArgs = process.argv.slice(2);

// const printProfileData = profileDataArr => {
//   // This...
//   for (let i = 0; i < profileDataArr.length; i += 1) {
//     console.log(profileDataArr[i]);
//   }

//   console.log('================');

//   // Is the same as this...
//   profileDataArr.forEach(profileItem => console.log(profileItem));
// };

// printProfileData(profileDataArgs);


//--------------------
// const profileDataArgs = process.argv.slice(2);
//--------------------

// const fs = require('fs');

// const profileDataArgs = process.argv.slice(2, process.argv.length);

// const [name1, github] = profileDataArgs; // replaces the two expressions below (assignment destructuring) which is an ES6 feature
// // const name1 = profileDataArgs[0];
// // const github = profileDataArgs[1];

// // const generatePage = (userName, githubName) => {
// //   return `
// //   Name: ${userName}
// //   Github: ${githubName}
// //   `;
// // };

// const generatePage = (name1, github) => {
//   return `
//   <!DOCTYPE html> 
//   <html lang="en"> 
//   <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <title>Portfolio Demo</title>
//   </head>

//   <body>
//     <h1>${name1}</h1>
//     <h2><a href="https://github.com/${github}">Github</a></h2>
//   </body>
//   </html>
//   `;
  
// };

// // console.log(name1, github);
// // console.log(generatePage(name1, github));

// fs.writeFile('index.html', generatePage(name1, github), err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });

const fs = require('fs');
const generatePage = require('./src/page-template.js');

const profileDataArgs = process.argv.slice(2);

const [name, github] = profileDataArgs;

// page-template.js contains the template literal for the webpage where user input is added -- i.e. the generatePage function

fs.writeFile('./index.html', generatePage(name, github), err => {
  if (err) throw new Error(err);

  console.log('Portfolio complete! Check out index.html to see the output!');
});