import React from 'react';
import Card from '@material-ui/core/Card';
import DescriptionIcon from '@material-ui/icons/Description';

const NoDataComponent = () => (
    <div id="nodata">
    <Card>
       <div className="nodataicon"><DescriptionIcon/></div>
       <b>No matching items found</b>
    </Card>
    </div>
)


export default NoDataComponent;