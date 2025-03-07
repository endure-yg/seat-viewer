// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// src/components/CsvUploader.tsx
import React, { useState } from 'react';
import Papa from 'papaparse';

type CsvRow = {
  [key: string]: string;
};

const CsvUploader: React.FC = () => {
  const [csvData, setCsvData] = useState<CsvRow[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    Papa.parse(file, {
      complete: (result) => {
        setCsvData(result.data as CsvRow[]); // Store parsed CSV data in state
      },
      header: true, // Treat the first row as header
      skipEmptyLines: true, // Skip any empty lines
    });
  };

  return (
    <div>
      <h1>2025 Youth Gathering Seat Viewer</h1>

      {/* File input */}
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {fileName && <p>Uploaded File: {fileName}</p>}

      {/* Display CSV data in a table */}
      {csvData.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(csvData[0]).map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CsvUploader;
