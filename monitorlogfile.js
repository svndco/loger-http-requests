const fs = require('fs');
const readline = require('readline');

// Create an interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Pattern to look for HTTP requests
const httpRequestPattern = /HTTP Request received:/;

const processLine = (line) => {
  if (httpRequestPattern.test(line)) {
    console.log(line);
  }
};

const readLogFile = (filePath) => {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  rl.on('line', processLine);
  
  rl.on('close', () => {
    fileStream.close();
  });
};

const watchFile = (filePath) => {
  let fileSize = fs.statSync(filePath).size;

  fs.watch(filePath, (eventType) => {
    if (eventType === 'change') {
      const newSize = fs.statSync(filePath).size;

      if (newSize > fileSize) {
        const stream = fs.createReadStream(filePath, {
          start: fileSize,
          end: newSize
        });

        const rl = readline.createInterface({
          input: stream,
          crlfDelay: Infinity
        });

        rl.on('line', processLine);
        fileSize = newSize;
      }
    }
  });
};

// Function to remove surrounding single or double quotes
const stripQuotes = (str) => str.replace(/^["']|["']$/g, '');

// Ask the user for the file path
rl.question('Please enter the path to your log file: ', (logFilePath) => {
  // Strip quotes from the input
  logFilePath = stripQuotes(logFilePath.trim());

  if (fs.existsSync(logFilePath)) {
    // Read the file from the beginning
    readLogFile(logFilePath);

    // Watch for updates to the file
    watchFile(logFilePath);
  } else {
    console.error(`The file "${logFilePath}" does not exist. Please provide a valid file path.`);
  }

  // Close the input interface
  rl.close();
});
