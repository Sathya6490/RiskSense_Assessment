import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
const dummyFun = () => {}
const value = [30, 100];
function valuetext(value) {
    return `$${value}`;
  }
const FilterComponent = ({defaultFilterValues, handleAvailability}) => (
    <Grid container id="LeftSidebar">

        <Grid item xs={12}>
        <section>
            <div className="container">
                <div className="title">
                    <h4>Filters</h4>
                    <span>Clear all filter</span>
                </div>
                <div className="sub-title">
                    <h5>Skills</h5>
                    <span>clear</span>
                </div>
                <div className="chips-filter">
                    <Paper>
                    <Chip
                        label="Deletable"
                        onDelete={dummyFun}
                        variant="outlined"
                    />
                    </Paper>
                </div>
                <div className="sub-title">
                    <h5>Availability<ErrorOutlineIcon/></h5>
                    <span>clear</span>
                </div>
                <div className="checkbox-filter">
                    {defaultFilterValues.availability.map(jobType => (<FormControlLabel control={<Checkbox />} label={jobType}/>))}
                </div>
                <div className="sub-title">
                    <h5>Pay rate/hr ($)</h5>
                    <span>clear</span>
                </div>
                <div className="progress-filter">
                    <Slider
                        value={defaultFilterValues.rate}
                        // onChange={handleChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={valuetext}
                    />
                </div>
                <div className="sub-title">
                    <h5>Countries</h5>
                    <span>clear</span>
                </div>
                <div className="dropdown-filter">
                <TextField label="Enter state, province or country" variant="outlined" fullWidth />
                </div>
            </div>
        </section>
        </Grid>
    </Grid>
    
            
);
export default FilterComponent;