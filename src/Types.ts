export type Dependency = Record<string, string>;

export interface PackageNodeInfo {
  dependencies?: Dependency;
  description?: string;
}

export interface TreeNode {
  name: string;
  attributes: string;
  children?: TreeNode;
}
