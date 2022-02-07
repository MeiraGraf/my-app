import * as readline from "readline";

import Tree from "react-d3-tree";
import { useEffect, useState } from "react";
import { getNpmData } from "./utils";
import { Dependency, PackageNodeInfo, TreeNode } from "./Types";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import { ParentNode } from "./Components/ParentNode";
import "./styles.css";


interface NpmPackageTreeProps {
  rootNode: PackageNodeInfo;
  packageName: string;
}

const containerStyles = {
  width: "100vw",
  height: "100vh",
};

export const NpmPackageTree: React.FC<NpmPackageTreeProps> = ({
  rootNode,
  packageName,
}) => {
  const { description = "", dependencies = {} } = rootNode;

  const treeRoot: RawNodeDatum = {
    name: packageName,
    attributes: { Description: description },
    children: Object.keys(dependencies).map((node) => ({
      name: node as string,
      children: [],
    })),
  };
  console.log(treeRoot);
  const [treeData, setTreeData] = useState<RawNodeDatum>(treeRoot);

  const handleNodeClick = async ({ children, name }: RawNodeDatum) => {
    const npmData = await getNpmData(name);
    console.log(npmData);
    const newChildren = Object.keys(npmData?.dependencies || {}).map(
      (node) => ({
        name: node as string,
      })
    );
    
    //change name
    const treeDataWithChildToRemove = treeData?.children?.filter(child=> child.name !== name)
    

    const treeDataWithChildToAdd = treeDataWithChildToRemove && [...treeDataWithChildToRemove, {name, children: newChildren}]

    treeDataWithChildToAdd && setTreeData({...treeData, children: treeDataWithChildToAdd })
    console.log(treeData);
  };
  const renderNodeWithCustomEvents = ({
    nodeDatum,
    toggleNode,
    handleNodeClick = "",
  }: any) => (
    <g>
      <circle r="15" onClick={() => handleNodeClick(nodeDatum)} />
      <text fill="black" strokeWidth="1" x="20" onClick={toggleNode}>
        {nodeDatum.name} (👉)
      </text>
      {nodeDatum.attributes?.description && (
        <text fill="black" x="20" dy="20" strokeWidth="1">
          Description: {nodeDatum.attributes?.description}
        </text>
      )}
      {nodeDatum.children?.dependencies && (
        <text fill="black" x="20" dy="20" strokeWidth="1">
          Children: {nodeDatum.children?.dependencies}
        </text>
      )}
    </g>
  );

  //const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 250, y: 200 };
  return (
    <div id="treeWrapper" style={containerStyles}>
      <Tree
        nodeSize={nodeSize}
        data={treeData}
        renderCustomNodeElement={(rd3tProps) =>
          renderNodeWithCustomEvents({ ...rd3tProps, handleNodeClick })
        }
        orientation="vertical"
      />
    </div>
  );
};
