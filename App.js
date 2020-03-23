import React, { Component } from 'react';

import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import SearchBar from './Components/SearchBar.jsx';
import SideBarComponent from './Components/SideBarComponent.js';
import FilterComponent from './Components/FilterComponent.js';
import ResultComponent from './Components/ResultComponent.js';
import NoDataComponent from './Components/NoDataComponent.js'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import "./Styles/style.scss";

const baseApiUrl = 'http://localhost:9090/api/jobdescriptions';
const jobsPerPage = 5;
class App extends Component {
    constructor(props) {
        super(props);
        this.searchBarComponent;
        this.state = {
            loading: true,
            unfilteredData: [],
            data: [],
            paginatedData: [],
            currentPageNumber: 1,
            sortedValue: 'relevance',
            defaultFilterValues: {
                skills: [],
                availability: [],
                rate: {},
                countries: [],
            },
            filters: {
                skills: [],
                countries: '',
            },
            searchedValue: '',
        };
        this._handleSearch = this._handleSearch.bind(this);
        this._handlePagination = this._handlePagination.bind(this);
        this._handleSortChange = this._handleSortChange.bind(this);
        this._handleSkills = this._handleSkills.bind(this);
        this._handleAvailability = this._handleAvailability.bind(this);
        this._handleRate = this._handleRate.bind(this);
        this._handleCountries = this._handleCountries.bind(this);
        this._handleClear = this._handleClear.bind(this);
        this._handleClearAll = this._handleClearAll.bind(this);
        this._handleRateInputChange = this._handleRateInputChange.bind(this);
        this._isMounted = false;
    }

    componentDidMount() {
        const { currentPageNumber } = this.state;
        this._isMounted = true;

        axios.get(baseApiUrl)
            .then((resp) => {
                const defaultFilterValues = this._getDefaultFilterValues(resp.data);
                if (this._isMounted) {
                    this.setState({
                        unfilteredData: resp.data,
                        data: resp.data,
                        defaultFilterValues,
                        loading: false,
                    });
                }
            })
            .catch(e => {
                if (this._isMounted) {
                    this.setState({
                        loading: false,
                    })
                }
            });
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    _handleSearch(e) {
        const {unfilteredData} = this.state;
        const value = this.searchBarComponent._getSearchInputValue();
        if(value) {
        this.setState({ loading: true });
        axios.get(`${baseApiUrl}/search?query=${value}`)
            .then((resp) => {
                const defaultFilterValues = this._getDefaultFilterValues(resp.data);
                this.setState({
                    data: resp.data,
                    defaultFilterValues,
                    loading: false,
                    searchedValue: value,
                })
            })
        } else {
            const defaultFilterValues = this._getDefaultFilterValues(unfilteredData);
            this.setState({
                data: unfilteredData,
                defaultFilterValues,
            })
        }
    } 
    _handlePagination(e, value) {
        this.setState({ currentPageNumber: value });
    }
    _handleSortChange(e, value) {
        this.setState({ sortedValue: value, currentPageNumber: 1 })
    }
    _handleSkills(e, value) {
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                skills: value
            }
        }))
    }
    _handleCountries(e, value) {
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                countries: value,
            }
        }))
    }
    _handleAvailability(e) {
        const { defaultFilterValues } = this.state;
        const updatedAvailability = defaultFilterValues.availability.map(jobType => {
            if (jobType.label === event.target.name) {
                return {
                    label: event.target.name,
                    checked: event.target.checked
                }
            }
            return jobType;
        })
        this.setState(prevState => ({
            defaultFilterValues: {
                ...prevState.defaultFilterValues,
                availability: updatedAvailability,
            }
        }))
    }
    _handleRate(e, value) {
        this.setState(prevState => ({
            defaultFilterValues: {
                ...prevState.defaultFilterValues,
                rate: {
                    ...prevState.defaultFilterValues.rate,
                    range: value,
                }
            }
        }))
    }
    _handleRateInputChange(e, type) {
        const inputValue = event.target.value;
        const value = inputValue === '' ? inputValue: Number(inputValue);
            this.setState(prevState => ({
                defaultFilterValues: {
                    ...prevState.defaultFilterValues,
                    rate: {
                        ...prevState.defaultFilterValues.rate,
                        range: [
                            type === 'start'? value: prevState.defaultFilterValues.rate.range[0],
                            type === 'end' ? value: prevState.defaultFilterValues.rate.range[1]
                        ],   
                    }
                }
            }))
    }
    _handleClear(e, type) {
        this.setState(prevState => {
            switch (type) {
                case 'skills':
                    return {
                        filters: {
                            ...prevState.filters,
                            [type]: []
                        }
                    }
                case 'rate':
                    return {
                        defaultFilterValues: {
                            ...prevState.defaultFilterValues,
                            rate: {
                                ...prevState.defaultFilterValues.rate,
                                range: [prevState.defaultFilterValues.rate.min, prevState.defaultFilterValues.rate.max]
                            }
                        }
                    }
                case 'availability':
                    return {
                        defaultFilterValues: {
                            ...prevState.defaultFilterValues,
                            availability: prevState.defaultFilterValues.availability.map(jobType => ({ ...jobType, checked: false }))
                        }
                    }
                default:
                    return {
                        filters: {
                            ...prevState.filters,
                            [type]: '',
                        }
                    }
            }
        })
    }
    _handleClearAll() {
        this.setState(prevState => ({
            filters: {
                skills: [],
                countries: '',
            },
            defaultFilterValues: {
                ...prevState.defaultFilterValues,
                rate: {
                    ...prevState.defaultFilterValues,
                    range: [prevState.defaultFilterValues.rate.min, prevState.defaultFilterValues.rate.max],
                },
                availability: prevState.defaultFilterValues.availability.map(jobType => ({ ...jobType, checked: false }))
            }
        }))
    }


    _getDefaultFilterValues(data) {
        const countries = data.reduce((accum, job) => accum.includes(job.location) ? accum : [...accum, job.location], []);
        const uniqueAvailability = data.reduce((accum, job) => accum.includes(job.jobType) ? accum : [...accum, job.jobType], []);
        const availability = uniqueAvailability.map(availability => ({ label: availability, checked: false }));
        const allRates = data.reduce((accum, job) => accum.includes(Number(job.salarymax)) ? accum : [...accum, Number(job.salarymax)], []);
        const minRate = Math.min(...allRates);
        const maxRate = Math.max(...allRates);
        const rate = {
            min: minRate,
            max: maxRate,
            range: [minRate, maxRate],
        }
        const allSkills = data.map(({ requiredSkills }) => requiredSkills);
        const skills = allSkills.join(',').split(',').reduce((accum, skill) => accum.includes(skill) ? accum : [...accum, skill], []);
        return {
            skills,
            availability,
            rate,
            countries,
        }
    }
    _getPaginatedData(data) {
        const { currentPageNumber } = this.state;
        const page = currentPageNumber - 1;
        return data.slice(page * jobsPerPage, page * jobsPerPage + jobsPerPage);
    }
    _getSortedData(data) {
        const { sortedValue } = this.state;
        if (sortedValue === 'Rate') {
            return [...data].sort((a, b) => a.salarymax - b.salarymax);
        }
        return data;
    }
    _getFilteredData() {
        const { data, filters, defaultFilterValues } = this.state;
        const selectedAvailability = defaultFilterValues.availability.filter(jobType => jobType.checked);
        const isRangeSelected = defaultFilterValues.rate.range[0] > 0 || defaultFilterValues.rate.range[1] > 0;
        if (filters.skills.length === 0 && !filters.countries && selectedAvailability.length === 0 && !isRangeSelected) {
            return data;
        }
        let filteredData = data;
        if (filters.skills.length !== 0) {
            filteredData = filteredData.filter(skillJob => skillJob.requiredSkills.split(',').find(skill => filters.skills.includes(skill)));
        }
        if (filters.countries) {
            filteredData = filteredData.filter(locationJob => locationJob.location === filters.countries);
        }
        if (selectedAvailability.length !== 0) {
            filteredData = filteredData.filter(availabilityJob => selectedAvailability.find(jobType => jobType.label === availabilityJob.jobType));
        }
        if (isRangeSelected) {
            filteredData = filteredData.filter(rateJob => Number(rateJob.salarymax) >= defaultFilterValues.rate.range[0] && Number(rateJob.salarymax) <= defaultFilterValues.rate.range[1]);
        }
        return filteredData;
    }
    render() {
        const filteredData = !this.state.loading ? this._getFilteredData() : [];
        const sortedData = this._getSortedData(filteredData);
        const paginatedData = this._getPaginatedData(sortedData);

        return (
            <div>
                <Header />
                {!this.state.loading && (
                    <div id="content">
                        <SearchBar ref={ref => {
                            if (ref) {
                                this.searchBarComponent = ref;
                            }
                        }} handleSearch={this._handleSearch} searchedValue={this.state.searchedValue} />
                        <Container maxWidth="lg">
                            <Grid container>
                                <Grid item xs={3}>
                                    <FilterComponent handleAvailability={this._handleAvailability} handleSkills={this._handleSkills} handleCountries={this._handleCountries} handleRate={this._handleRate} defaultFilterValues={this.state.defaultFilterValues}
                                        handleClearAll={this._handleClearAll} handleClear={this._handleClear}
                                        selectedSkills={this.state.filters.skills} selectedCountries={this.state.filters.countries} handleRateInputChange= {this._handleRateInputChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    {paginatedData.length > 0 
                                    ? <ResultComponent data={paginatedData} totalCount={sortedData.length} handlePagination={this._handlePagination} handleSortChange={this._handleSortChange} currentPageNumber={this.state.currentPageNumber}
                                    />
                                    : <NoDataComponent/>}
                                </Grid>
                                <Grid item xs={3}>
                                    <SideBarComponent />
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                )}
                <Footer />
            </div>
        );
    }
}
export default App;