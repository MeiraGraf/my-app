import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getNpmData } from "./utils";
import { NpmPackageTree } from "./NpmPackageTree";
import { PackageNodeInfo } from "./Types";

// const changeHandler = (event: React.KeyboardEvent) => {
//   setForm({ ...form, [event.target.name]: event.target.value })
// }

// const showState = () => {
//   console.log(form)
// }
const input = document.querySelector("input");
const log = document.getElementById("values");


export default App;

 function App() {
  const [packageName, setPackageName] = useState<string>("Enter package name");
  const [packageDetails, setPackageDetails] = useState<PackageNodeInfo>();

  return (
    <div className="App">
      <header className="App-header">
        <label>
          Package name:
          <input
            title={"input package name"}
            value={packageName}
            onChange={(inputText) => setPackageName(inputText.target.value)}
          />
        </label>
        <button
          style={{ margin: "10px" }}
          onClick={async () => {
            const npmData = await getNpmData(packageName);
            setPackageDetails(npmData);
          }}
          title={"get npm data"}
        />

        {packageDetails && <NpmPackageTree rootNode={packageDetails} packageName ={packageName}/>}
      </header>
    </div>
  );
}

//export default App;

/*import React from 'react';
import logo from './logo.svg';
import './App.css';
import { getNpmPackages } from './utils';

// call the api 'npm packages... get the data
//put data into usable form - modify/organize 
//create custom react d3 tree -input data and then its there 
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        < button 
          onClick={() => getNpmPackages('react')}
          title='Print Dependencies'
        />
      </header>
    </div>
  );
}

export default App;
*/
