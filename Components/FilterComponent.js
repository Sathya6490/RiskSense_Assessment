import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import MultiSelectComponent from './MultiSelectComponent.js';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const getLabels = (min, max) => (
     [
    {
      value: min,
      label: `$${min}`,
    },
    {
      value: max,
      label: `$${max}`,
    },
]);
const valuetext = value => `$${value}`;


const FilterComponent = ({ defaultFilterValues, handleAvailability, handleCountries, handleSkills, handleRate, handleClear, handleClearAll, selectedSkills, selectedCountries, handleRateInputChange }) => (
    <Grid container id="LeftSidebar">
        <Grid item xs={12}>
            <section>
                <div className="container">
                    <div className="title">
                        <h4>Filters</h4>
                        <Button onClick={handleClearAll}>Clear all filter</Button>
                    </div>
                    <div className="sub-title">
                        <h5>Skills</h5>
                        <Button onClick={(e) => handleClear(e, 'skills')}>clear</Button>
                    </div>
                    <div className="chips-filter">
                        <MultiSelectComponent options={defaultFilterValues.skills} handleChange={handleSkills} selectedSkills={selectedSkills} />
                    </div>
                    <div className="sub-title">
                        <h5>Availability<ErrorOutlineIcon /></h5>
                        <Button onClick={(e) => handleClear(e, 'availability')}>clear</Button>
                    </div>
                    <div className="checkbox-filter">
                        {defaultFilterValues.availability.map(jobType => (<FormControlLabel key={jobType.label} control={<Checkbox key={`${jobType.label}_checkBox`} checked={jobType.checked} onChange={handleAvailability} name={jobType.label} />} label={jobType.label} />))}
                    </div>
                    <div className="sub-title">
                        <h5>Pay rate/hr ($)</h5>
                        <Button onClick={(e) => handleClear(e, 'rate')}>clear</Button>
                    </div>
                    <div className="progress-filter">
                        <div className="">
                            <Grid item>
                                <Input 
                                    value={defaultFilterValues.rate.range[0]}
                                    margin="dense"
                                    onChange={(e) => handleRateInputChange(e, 'start')}
                                    inputProps={{
                                    step: 100,
                                    min: defaultFilterValues.rate.min,
                                    max: defaultFilterValues.rate.max,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                    }}
                                /> — 
                                <Input 
                                    value={defaultFilterValues.rate.range[1]}
                                    margin="dense"
                                    onChange={(e) => handleRateInputChange(e, 'end')}
                                    inputProps={{
                                    step: 100,
                                    min: defaultFilterValues.rate.min,
                                    max: defaultFilterValues.rate.max,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                    }}
                                    style={{marginLeft: '10px'}}
                                />
                            </Grid>
                        </div>
                        <Slider
                            value={defaultFilterValues.rate.range}
                            min={defaultFilterValues.rate.min}
                            max={defaultFilterValues.rate.max}
                            onChange={handleRate}
                            valueLabelDisplay="auto"
                            marks={getLabels(defaultFilterValues.rate.min, defaultFilterValues.rate.max)}
                            aria-labelledby="range-slider"
                            getAriaValueText={valuetext}
                            style={{marginTop:'10px'}}
                        />
                    </div>
                    <div className="sub-title">
                        <h5>Countries</h5>
                        <Button onClick={(e) => handleClear(e, 'countries')}>clear</Button>
                    </div>
                    <div className="dropdown-filter">
                        <Autocomplete
                            options={defaultFilterValues.countries}
                            value={selectedCountries}
                            getOptionLabel={option => option}
                            renderInput={params => <TextField {...params} variant="outlined" fullWidth placeholder="Enter state, province and country"/>}
                            onChange={handleCountries}
                        />
                    </div>
                </div>
            </section>
        </Grid>
    </Grid>
);
export default FilterComponent;