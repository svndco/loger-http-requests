const fs = require('fs');
const readline = require('readline');

// Corrected path to your .txt log file
const logFilePath = '20240614 ACS-Dir-console.txt';

// Pattern to look for HTTP requests
const httpRequestPattern = /HTTP Request received:/;

const processLine = (line) => {
  if (httpRequestPattern.test(line)) {
    console.log(line);
  }
};

const readLogFile = (filePath) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity
  });

  rl.on('line', processLine);
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

// Read the file from the beginning
readLogFile(logFilePath);

// Watch for updates to the file
watchFile(logFilePath);
