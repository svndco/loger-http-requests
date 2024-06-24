# HTTP Request Log Monitor

This Node.js script monitors a specified log file for HTTP request entries. It scans the log file for lines containing the string `HTTP Request received:` and outputs these lines to an Electron window. Additionally, it watches the file for real-time updates and processes new entries as they are added.

## Features
-    **Full Scan**: Reads the entire log file from the beginning and identifies lines with `HTTP Request received:`.
-    **Real-Time Monitoring**: Watches the log file for new entries and processes them dynamically.
-    **Flexible File Path Input**: Enter the file path in the Electron app's input field to start monitoring.
-    **Stop Logging**: Ability to stop logging using either the terminal command or the Electron app.

## Requirements
-    Node.js (version 12 or above)
-    NPM (Node Package Manager)
-    Electron
-    File system access to read and watch the log file

## Installation

1. Ensure you have Node.js and npm installed. If not, download and install them from [nodejs.org](https://nodejs.org/).
2. Clone this repository or download the script files.
3. Navigate to the project directory and install the required dependencies:
   ```sh
   npm install
