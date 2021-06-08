// var commandLineArgs = process.argv; // "process" is a global object that represents everything going on with this app
// // the argv property is an array that holds what was typed into the command line -- in this case it represents the indexes of Node.js and the executed file
// console.log(commandLineArgs);
// // console.log(process);


/////

// var profileDataArgs = process.argv.slice(2, process.argv.length); // ---- why is the .length here?
// console.log(profileDataArgs);


// But wait, if we want .slice() to return everything including the final index, why don't we write process.argv.slice(2, process.argv.length - 1);? It turns out .slice() returns everything from the first zero-based index we provide as the first argument up to but not including the zero-based index we provide as the second argument. So, to return through the last index in the array, we provide the length of the array as the second argument.

// This way, you don't actually manipulate process.argv, but rather create a new array based on the values from the third index and on.

const profileDataArgs = process.argv.slice(2, process.argv.length); // takes the elements entered into the terminal and makes them into the array
console.log(profileDataArgs); // displays the array


// const printProfileData = (profileDataArr) => {
//     console.log(profileDataArr);
// };



// Notice the lack of parentheses around the `profileDataArr` parameter?
const printProfileData = profileDataArr => {
    // This...
  for (let i = 0; i < profileDataArr.length; i += 1) {
    console.log(profileDataArr[i]);
  }

  console.log('================');

  // Is the same as this...
  profileDataArr.forEach((profileItem) => {
    console.log(profileItem)
  });
};


  printProfileData(profileDataArgs); // calls the function, which pulls the data from the first array variable, then logs it

// var is function scoped and let is block scoped