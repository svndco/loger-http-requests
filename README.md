# HTTP Request Log Monitor

This Node.js script monitors a specified log file for HTTP request entries. It scans the log file for lines containing the string `HTTP Request received:` and outputs these lines to the console. Additionally, it watches the file for real-time updates and processes new entries as they are added.

## Features
-  **Full Scan**: Reads the entire log file from the beginning and identifies lines with `HTTP Request received:`.
-  **Real-Time Monitoring**: Watches the log file for new entries and processes them dynamically.
-  **Flexible File Path Input**: Accepts log file paths with or without quotes.

## Requirements
-  Node.js (version 12 or above)
-  File system access to read and watch the log file

## Installation
1. Ensure you have Node.js installed. If not, download and install it from [nodejs.org](https://nodejs.org/).
2. Clone this repository or download the script file.
3. Place the `logger-httpreq.js` script in your desired directory.

## Usage
1. Open a terminal or command prompt.
2. Navigate to the directory containing the `logger-httpreq.js` script.
3. Run the script using Node.js:
   ```sh
   node logger-httpreq.js
