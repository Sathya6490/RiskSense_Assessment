import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import MultiSelectComponent from './MultiSelectComponent.js';

const valuetext = value => `$${value}`;

const FilterComponent = ({ defaultFilterValues, handleAvailability, handleCountries, handleSkills, handleRate, handleClear, handleClearAll, selectedSkills, selectedCountries }) => (
    <Grid container id="LeftSidebar">
        <Grid item xs={12}>
            <section>
                <div className="container">
                    <div className="title">
                        <h4>Filters</h4>
                        <span onClick={handleClearAll}>Clear all filter</span>
                    </div>
                    <div className="sub-title">
                        <h5>Skills</h5>
                        <span onClick={(e) => handleClear(e, 'skills')}>clear</span>
                    </div>
                    <div className="chips-filter">
                        <MultiSelectComponent options={defaultFilterValues.skills} handleChange={handleSkills} selectedSkills={selectedSkills} />
                    </div>
                    <div className="sub-title">
                        <h5>Availability<ErrorOutlineIcon /></h5>
                        <span onClick={(e) => handleClear(e, 'availability')}>clear</span>
                    </div>
                    <div className="checkbox-filter">
                        {defaultFilterValues.availability.map(jobType => (<FormControlLabel key={jobType.label} control={<Checkbox key={`${jobType.label}_checkBox`} checked={jobType.checked} onChange={handleAvailability} name={jobType.label} />} label={jobType.label} />))}
                    </div>
                    <div className="sub-title">
                        <h5>Pay rate/hr ($)</h5>
                        <span onClick={(e) => handleClear(e, 'rate')}>clear</span>
                    </div>
                    <div className="progress-filter">
                        <Slider
                            value={defaultFilterValues.rate.range}
                            min={defaultFilterValues.rate.min}
                            max={defaultFilterValues.rate.max}
                            onChange={handleRate}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            getAriaValueText={valuetext}
                        />
                    </div>
                    <div className="sub-title">
                        <h5>Countries</h5>
                        <span onClick={(e) => handleClear(e, 'countries')}>clear</span>
                    </div>
                    <div className="dropdown-filter">
                        <Autocomplete
                            id="grouped-demo"
                            options={defaultFilterValues.countries}
                            value={selectedCountries}
                            getOptionLabel={option => option}
                            style={{ width: 100 }}
                            renderInput={params => <TextField {...params} variant="outlined" />}
                            onChange={handleCountries}
                        />
                    </div>
                </div>
            </section>
        </Grid>
    </Grid>
);
export default FilterComponent;