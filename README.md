# HTTP Request Log Monitor

This Node.js script monitors a specified log file for HTTP request entries. It scans the log file for lines containing the string `HTTP Request received:` and outputs these lines to the console. Additionally, it watches the file for real-time updates and processes new entries as they are added.

## Features
-  **Full Scan**: Reads the entire log file from the beginning and identifies lines with `HTTP Request received:`.
-  **Real-Time Monitoring**: Watches the log file for new entries and processes them dynamically.

## Requirements
-  Node.js (version 12 or above)
-  File system access to read and watch the log file

## Installation
1. Ensure you have Node.js installed. If not, download and install it from [nodejs.org](https://nodejs.org/).
2. Clone this repository or download the script file.
3. Place the `monitorlogfile.js` script in the same directory as your log file (e.g., `20240614 ACS-Dir-console.txt`).

## Usage
1. Open a terminal or command prompt.
2. Navigate to the directory containing the `monitorlogfile.js` and your log file (`20240614 ACS-Dir-console.txt`).
3. Run the script using Node.js:
   ```sh
   node monitorlogfile.js
