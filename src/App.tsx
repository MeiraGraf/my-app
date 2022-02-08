import React, { useState } from 'react';
import { getNpmData } from './utils';
import { NpmPackageTree } from './NpmPackageTree';
import { PackageNodeInfo } from './Types';
export default App;

function App() {
    const [packageName, setPackageName] = useState<string>();
    const [packageDetails, setPackageDetails] = useState<PackageNodeInfo>();

    return (
        <div className='App'>
            <header>
                <label>
                    Enter Package name:
                    <input
                        title={'input package name'}
                        value={packageName}
                        onChange={(inputText) =>
                            setPackageName(inputText.target.value)
                        }
                        style={{ marginLeft: '4px' }}
                    />
                </label>
                <button
                    style={{ margin: '10px' }}
                    onClick={async () => {
                        const npmData = await getNpmData(packageName);
                        setPackageDetails(npmData);
                    }}
                >
                    Get NPM Package info
                </button>
                {packageDetails && (
                    <NpmPackageTree
                        rootNode={packageDetails}
                        packageName={packageName}
                    />
                )}
            </header>
        </div>
    );
}


