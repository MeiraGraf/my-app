import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getNpmData } from "./utils";
import { NpmPackageTree } from "./NpmPackageTree";
import { PackageNodeInfo } from "./Types";

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
            style={{float: "left"}}
          />
        </label>
        <button
          style={{ margin: "10px", float: "left" }}
          onClick={async () => {
            const npmData = await getNpmData(packageName);
            setPackageDetails(npmData);
          }}
          title={"get npm data"}
          >get npm data</button>
      

        {packageDetails && <NpmPackageTree rootNode={packageDetails} packageName ={packageName}/>}
      </header>
    </div>
  );
}


