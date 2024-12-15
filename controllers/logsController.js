const fs = require('fs');
const path = require('path');

// Controller to fetch logs
const getLogs = (req, res) => {
  const logFilePath = path.join(__dirname, '../logs/app.log');
  

  // Read the log file
  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading log file:', err);
      return res.status(500).json({ error: 'Unable to fetch logs.' });
    }

    // Split the log file into lines
    const logLines = data.split('\n').filter(line => line.trim() !== '');

    // Parse each line as JSON (if possible)
     // Parse each line as JSON (if possible)
     const formattedLogs = logLines.map(line => {
        try {
          return JSON.parse(line); // Convert string to JSON
        } catch (error) {
          return { raw: line }; // If parsing fails, include the raw log line
        }
      });
  
      // Sort logs by timestamp in descending order
      const sortedLogs = formattedLogs.sort((a, b) => {
        const timestampA = new Date(a.timestamp || 0).getTime();
        const timestampB = new Date(b.timestamp || 0).getTime();
        return timestampB - timestampA; // Descending order
      });
  
      // Return the sorted logs
      res.status(200).json(sortedLogs);

    
  });
};

module.exports = { getLogs };