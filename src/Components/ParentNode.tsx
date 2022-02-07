import { RawNodeDatum } from 'react-d3-tree/lib/types/common';

interface NpmPackageTreeProps {
    node: RawNodeDatum;
}

export const ParentNode: React.FC<NpmPackageTreeProps> = ({
   node
}) => {
    const {name = '', attributes ={}, children = []} = node;
    
    

   return (<div>
    <div className="card">
      <div className="card-body">
        <h5 style={{ margin: "5px" }} className="card-title">
          {name}
        </h5>
        <p style={{ margin: "5px" }} className="card-text">
          {attributes.Description}
        </p>
      </div>
    </div>
  </div>)
};