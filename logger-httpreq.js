const fs = require('fs');
const readline = require('readline');

// Create an interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Pattern to look for HTTP requests
const httpRequestPattern = /HTTP Request received:/;

let watcher;

const processLine = (line) => {
  if (httpRequestPattern.test(line)) {
    // Send the log message to the parent process if available
    if (process.send) {
      process.send({ type: 'log-message', message: line });
    }
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

  watcher = fs.watch(filePath, (eventType) => {
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

  process.send({ type: 'log-message', message: `Watching file: ${filePath}\n` });
};

// Get the file path from the command-line arguments
const logFilePath = process.argv[2];

if (logFilePath && fs.existsSync(logFilePath)) {
  // Read the file from the beginning
  readLogFile(logFilePath);

  // Watch for updates to the file
  watchFile(logFilePath);
} else {
  process.send({ type: 'log-message', message: `The file "${logFilePath}" does not exist. Stopping process.\n` });
  process.exit();
}
