import React, { Component } from 'react';

import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import SearchBar from './Components/SearchBar.js';
import SideBarComponent from './Components/SideBarComponent.js';
import FilterComponent from './Components/FilterComponent.js';
import ResultComponent from './Components/ResultComponent.js';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import "./Styles/style.scss";

const baseApiUrl = 'http://localhost:9090/api';
const jobsPerPage = 5;
class App extends Component{
    constructor (props){
        super(props);
        this.state = { 
            loading: true,
            data:[], 
            paginatedData:[],
             currentPageNumber: 1,
            sortedValue: 'relevance',
            defaultFilterValues: {
                skills: [],
                availability: [],
                rate: [],
                countries: [],
            },
            filters: {
                skills: [],
                availability: [],
                rate: [],
                countries: '',
            },
        };
        this._handlePagination = this._handlePagination.bind(this);
        this._handleSortChange = this._handleSortChange.bind(this);
        this._handleSkills = this._handleSkills.bind(this);
        this._handleAvailability = this._handleAvailability.bind(this);
        this._handleRate = this._handleRate.bind(this);
        this._handleCountries = this._handleCountries.bind(this);
        this._isMounted = false;
    }
    
    componentDidMount () {
        const {currentPageNumber} = this.state;
        this._isMounted = true;
        const axios = require ('axios');

        axios.get(`${baseApiUrl}/jobdescriptions`)
        .then( (resp) => {
            const defaultFilterValues = this._getDefaultFilterValues(resp.data);
            if(this._isMounted) {
           this.setState({
               data : resp.data, 
               defaultFilterValues,
           });
        }
        });
    }
    componentWillUnmount () {
        this._isMounted = false;
    }
    _handlePagination (e, value) { 
        this.setState({currentPageNumber: value});
    }
    _handleSortChange(e, value) {
        this.setState({sortedValue: value, currentPageNumber: 1})
    }
    _handleSkills(e,value) {
        this.setState( prevState => ({
            filters: {
                ...prevState.filters,
                skills: [...prevState.filters.skills, value]
            }
        }))
    }
    _handleCountries(e, value) {
        this.setState( prevState => ({
            filters: {
                ...prevState.filters,
                countries: value,
            }
        }))
    }
    _handleAvailability(e, value) {

    }
    _handleRate(e,value) {

    }
    _handleClear(e,type) {
        this.setState( prevState => {
            if(type === 'countries') {
                return {
                    ...prevState.filters,
                    [type]: '',
                }
            }
            return {
                ...prevState.filters,
                [type]: [],
            }
        })
    }
    _handleClearAll() {
        this.setState({
            filters: {
                skills: [],
                availability: [],
                rate: [],
                countries: '',
            }
        })
    }


    _getDefaultFilterValues(data) {
        const countries = data.reduce( (accum,job) => accum.includes(job.location) ? accum: [...accum, job.location], []);
        const availability = data.reduce( (accum,job) => accum.includes(job.jobType) ? accum: [...accum, job.jobType], []);
        const allRates = data.reduce( (accum,job) => accum.includes(Number(job.salarymax)) ? accum: [...accum, Number(job.salarymax)], []);
        const rate = [Math.min(...allRates), Math.max(...allRates)];
        const allSkills = data.map( ({requiredSkills}) => requiredSkills);
        const skills = allSkills.reduce( (accum,skill) => accum.includes(skill)? accum: [...accum,skill], []);
        return {
            skills,
            availability,
            rate,
            countries,
        }
    }
    _getPaginatedData(data) {
        const {currentPageNumber} = this.state;
        const page = currentPageNumber -1;     
        return data.slice(page * jobsPerPage, page * jobsPerPage + jobsPerPage);
    }
    _getSortedData (data) {
        const {sortedValue} = this.state;
        if(sortedValue==='Rate') {
            return [...data].sort( (a,b) => a.salarymax - b.salarymax);
        }
        return data;
    }
    _getFilteredData() {
        const {data, filters} = this.state;
        const filteredData = data.filter(job => {
            if(filters.skills.length === 0 && filters.countries === '' && filters.availability.length === 0 && filters.rate.length ===0 ) {
                return job;
            }
            return (job.requiredSkills.split(',').find(skill => filters.skills.includes(skill)) ||
                job.location.toLowerCase() === filters.countries.toLowerCase() ||
                filters.availability.includes(job.jobType) ||
                job.salarymax >= filters.rate[0] && job.salarymax <= filters.rate[1]
        )
        });
        return filteredData;
    }
    render(){
       const filteredData = this._getFilteredData();
       const sortedData = this._getSortedData(filteredData);
       const paginatedData = this._getPaginatedData(sortedData);
       console.log(this.state.defaultFilterValues);
       
      return(
         <div>
            <Header />
            <div id="content">   
                <SearchBar/> 
                <Container maxWidth="lg">
                    <Grid container>
                        <Grid item xs={3}>
                            <FilterComponent handleAvailability={this._handleAvailability} handleSkills={this._handleSkills} handleCountries={this._handleCountries} handleRate={this._handleRate} defaultFilterValues={this.state.defaultFilterValues}/>
                        </Grid>
                        <Grid item xs={6}>
                            {paginatedData.length > 0 && <ResultComponent data={paginatedData} totalCount = {sortedData.length} handlePagination = {this._handlePagination} handleSortChange={this._handleSortChange} currentPageNumber={this.state.currentPageNumber} />}
                        </Grid>
                        <Grid item xs={3}>
                            <SideBarComponent/>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <Footer/>
         </div>
      );
   }
}
export default App;