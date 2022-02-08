export const renderNodeWithCustomEvents = ({
  nodeDatum,
  toggleNode,
  handleNodeClick = '',
}: any) => (
  <g>
      <circle r='15' onClick={() => handleNodeClick(nodeDatum)} />
      <text fill='black' strokeWidth='1' x='20' onClick={toggleNode}>
          {nodeDatum.name} (👉)
      </text>
      {nodeDatum.attributes?.description && (
          <text fill='black' x='20' dy='20' strokeWidth='1'>
              Description: {nodeDatum.attributes?.description}
          </text>
      )}
      {nodeDatum.children?.dependencies && (
          <text fill='black' x='20' dy='20' strokeWidth='1'>
              Children: {nodeDatum.children?.dependencies}
          </text>
      )}
  </g>
);


