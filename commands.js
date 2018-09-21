const fs = require("fs");

//write out data
function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

//where we will store our commands
function evaluateCmd(userInput) {
 //parses the user input to understand which command was typed
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];
  switch (command) {
       case "echo":
        //we will add the functionality of echo next within the object commandLibrary
         commandLibrary.echo(userInputArray.slice(1).join(" "));
         break;
       case "cat":
         commandLibrary.cat(userInputArray.slice(1));
         break;

         case "head":
        commandLibrary.head(userInputArray.slice(1));
        break;

        case "tail":
        commandLibrary.tail(userInputArray.slice(1));
        break;

        default:
        done("You have entered a non-existant command.")
     }
}

//where we will store the logic of our commands
const commandLibrary = {
  "echo": function(userInput) {
    done(userInput);
  },
  //cat command
  "cat": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
        if (err) throe err;
        done(data);
    });
  },
  //head command
  "head": function(path) {
      const fileName = path[0];
      fs.readFile(fileName, 'utf8', (err, data) => {
          if (err) throw err;
          let dataArray = data.split('\n');
          const firstTen = dataArray.splice(0,10).join('\n');
          done(firstTen);
      })
  },
  //tail command
  "tail": function(path) {
      const fileName = path[0];
      fs.readFile(fileName, 'utf8', (err, data) => {
          if (err) throw err;
          let dataArray = data.split('\n')
          const lastTen = dataArray.splice(-10, 10).join('\n');
          done(lastTen);
      })
  }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
