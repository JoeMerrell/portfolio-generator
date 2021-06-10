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
const inquirer = require('inquirer');
const generatePage = require('./src/page-template');

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username (Required)',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter your GitHub username!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => confirmAbout
      // this arrow function for when evaluates whether the user answered yes to the previous question then prompts the question if the answer was yes.

      // in traditional format the function is:
      
      // when: ({ confirmAbout }) => {
        // if (confirmAbout) {
        //   return true;
        // } else {
        //   return false;
        // }
  }

    }
  ]);
};

const promptProject = portfolioData => {
  console.log(`
=================
Add a New Project
=================
`);

  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {  // .projects is an array in the portfolioData array
    portfolioData.projects = [];
  }
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project? (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('You need to enter a project name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          } else {
            console.log('You need to enter a project description!');
            return false;
          }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: linkInput => {
          if (linkInput) {
            return true;
          } else {
            console.log('You need to enter a project GitHub link!');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
    // will be uncommented in lesson 4
    // const pageHTML = generatePage(portfolioData);
    // fs.writeFile('./index.html', pageHTML, err => {
    //   if (err) throw new Error(err);
    //   console.log('Page created! Check out index.html in this directory to see it!');
    // });
  });



// From the module 9.3.5: Notice that the function returns a running of inquire.prompt(), thus returning what it returns, which is a Promise. Just like fetch(), which we covered previously, the Promise will resolve with a .then() method.

// Continued: So, here we're calling a function that returns the result of inquire.prompt, which is a Promise. We therefore append the .then() method to the function call, since it returns a Promise, and we put into .then() whatever we wish to take place after the Promise is resolved.


// const fs = require('fs');
// const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name, github);

// // page-template.js contains the template literal for the webpage where user input is added -- i.e. the generatePage function

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });