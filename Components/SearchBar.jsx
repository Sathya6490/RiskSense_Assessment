import React from 'react';
import Button from '@material-ui/core/Button';
import {
    AppBar,
    Toolbar
 } from '@material-ui/core';
import Container from '@material-ui/core/Container';

class SearchBar extends React.Component {
    searchInput;
    constructor(props) {
        super(props);
        this.state = {
            searchValue : this.props.searchedValue
        }
        this._handleSearchText = this._handleSearchText.bind(this);
    }
    _getSearchInputValue() {
        return this.searchInput.value;
    }
    _handleSearchText(e){
        this.setState({
            searchValue: this.searchInput.value
        })
    }

    render() {
        return (
            <Container maxWidth="lg">
                <AppBar position="static" style={{background: '#fff', marginBottom: '30px'}} >
                    <Toolbar>
                    <section>
                        <input ref={(input) => {
                            if(input ){
                                this.searchInput = input
                                }
                            }
                         } value={this.state.searchValue} type="text" name="searchTextField" onChange={this._handleSearchText} placeholder="Search by keywords(PHP, .NET, graphic design, etc)" style={{border:'none'}}/>
                        <Button type="submit" variant="contained" color="primary" className="search-btn" onClick={this.props.handleSearch}>Search</Button>
                    </section>
                    </Toolbar>
                </AppBar>
            </Container>        
        )
    }
}

export default SearchBar;