import Tree from 'react-d3-tree';
import { useState } from 'react';
import { getNpmData, useCenteredTree } from './utils';
import { PackageNodeInfo } from './Types';
import { RawNodeDatum } from 'react-d3-tree/lib/types/common';
import './styles.css';
import { renderNodeWithCustomEvents } from './Components/CustomNode';

interface NpmPackageTreeProps {
    rootNode: PackageNodeInfo;
    packageName: string;
}

const containerStyles = {
    width: '100vw',
    height: '100vh',
};

export const NpmPackageTree: React.FC<NpmPackageTreeProps> = ({
    rootNode,
    packageName,
}) => {
    const { description = '', dependencies = {} } = rootNode;
    const [translate, containerRef] = useCenteredTree();
    const nodeSize = { x: 250, y: 200 };
    const treeRoot: RawNodeDatum = {
        name: packageName,
        attributes: { Description: description },
        children: Object.keys(dependencies).map((node) => ({
            name: node as string,
            children: [],
        })),
    };
    const [treeData, setTreeData] = useState<RawNodeDatum>(treeRoot);

    const handleNodeClick = async ({ children, name }: RawNodeDatum) => {
        const npmData = await getNpmData(name);
        console.log(npmData);
        const newChildren = Object.keys(npmData?.dependencies || {}).map(
            (node) => ({
                name: node as string,
            })
        );
        const treeDataWithNewInfo = treeData?.children?.map((child) => {
            let childToBeAdded = child;
            if (childToBeAdded.name === name) {
                childToBeAdded.children = newChildren;
            }
            return childToBeAdded;
        });
        setTreeData({ ...treeData, children: treeDataWithNewInfo });
    };

    return (
        <div
            id='treeWrapper'
            style={containerStyles}
            ref={containerRef as (containerElem: any) => void}
        >
            <Tree
                nodeSize={nodeSize}
                data={treeData}
                translate={translate as { x: number; y: number }}
                renderCustomNodeElement={(NpmTreeProps) =>
                    renderNodeWithCustomEvents({
                        ...NpmTreeProps,
                        handleNodeClick,
                    })
                }
                orientation='vertical'
            />
        </div> 
    );
};

// import * as readline from "readline";

// import Tree from "react-d3-tree";
// import { useEffect, useState } from "react";
// import { getNpmData, useCenteredTree } from "./utils";
// import { Dependency, PackageNodeInfo, TreeNode } from "./Types";
// import { RawNodeDatum } from "react-d3-tree/lib/types/common";
// import { ParentNode } from "./Components/ParentNode";
// import "./styles.css";
// import React from "react";

// interface NpmPackageTreeProps {
//   rootNode: PackageNodeInfo;
//   packageName: string;
// }

// const containerStyles = {
//   width: "100vw",
//   height: "100vh",
// };


// export const NpmPackageTree: React.FC<NpmPackageTreeProps> = ({
//   rootNode,
//   packageName,
// }) => {
//   const { description = "", dependencies = {} } = rootNode;

//   const treeRoot: RawNodeDatum = {
//     name: packageName,
//     attributes: { Description: description },
//     children: Object.keys(dependencies).map((node) => ({
//       name: node as string,
//       children: [],
//     })),
//   };
//   console.log(treeRoot);
//   const [treeData, setTreeData] = useState<RawNodeDatum>(treeRoot);

//   const handleNodeClick = async ({ children, name }: RawNodeDatum) => {
//     const npmData = await getNpmData(name);
//     console.log(npmData);
//     const newChildren = Object.keys(npmData?.dependencies || {}).map(
//       (node) => ({
//         name: node as string,
//       })
//     );
//     const treeDataWithChildToRemove = treeData?.children?.filter(
//       (child) => child.name !== name && child.name !== treeData.name
//     );
//     const treeDataWithChildToAdd = treeDataWithChildToRemove && [
//       ...treeDataWithChildToRemove,
//       { name, children: newChildren },
//     ];
//     treeDataWithChildToAdd &&
//       setTreeData({ ...treeData, children: treeDataWithChildToAdd });
//   };
//   const renderNodeWithCustomEvents = ({
//     nodeDatum,
//     toggleNode,
//     handleNodeClick = "",
//   }: any) => (
//     <g>
//       <circle r="15" onClick={() => handleNodeClick(nodeDatum)} />
//       <text fill="black" strokeWidth="1" x="20" onClick={toggleNode}>
//         {nodeDatum.name}
//       </text>
//       {nodeDatum.attributes?.description && (
//         <text fill="black" x="20" dy="20" strokeWidth="1">
//           Description: {nodeDatum.attributes?.description}
//         </text>
//       )}
//     </g>
//   );
  
  


//   const [translate, containerRef] = useCenteredTree();
//   const nodeSize = { x: 250, y: 200 };

//   return (
//     <div  id="treeWrapper" style={containerStyles} >
//       <Tree
//         nodeSize={nodeSize}
//         data={treeData}
//         //translate={translate}
//         renderCustomNodeElement={(rd3tProps) =>
//           renderNodeWithCustomEvents({ ...rd3tProps, handleNodeClick })
//         }
//         orientation="vertical"
//       />
//     </div>
//   );
// };
