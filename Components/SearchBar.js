import React from 'react';
import Button from '@material-ui/core/Button';
import {
    AppBar,
    Toolbar
 } from '@material-ui/core';
import Container from '@material-ui/core/Container';

const SearchBar = () => (
        
            <Container maxWidth="lg">
                <AppBar position="static" style={{background: '#fff', marginBottom: '30px'}} >
                    <Toolbar>
                    <section>
                        <input type="text" placeholder="Type here to search"/>
                        <Button type="submit" varient="contained" color="primary" className="search-btn">Search</Button>
                    </section>
                    </Toolbar>
                </AppBar>
            </Container>
        
       );
export default SearchBar;