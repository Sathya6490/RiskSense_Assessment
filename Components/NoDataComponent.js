import React from 'react';
import Card from '@material-ui/core/Card';
import DescriptionIcon from '@material-ui/icons/Description';

const NoDataComponent = () => {
    <Card>
       <div className="nodataicon"><DescriptionIcon/></div>
       <p>No matching items found</p>
    </Card>
}


export default NoDataComponent;