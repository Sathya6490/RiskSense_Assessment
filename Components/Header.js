import React from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {
    AppBar,
    Toolbar
 } from '@material-ui/core';
import Container from '@material-ui/core/Container';

const Header = () => (
            <AppBar position="static" style={{background: '#fff'}} id="header">
                <Container maxWidth="lg">
                    <Toolbar>
                        <div className="container">
                            <div className="company-logo">Risk Sense</div>
                            <div className="nav-list">
                                <span><a href="#">How it works</a></span>
                                <span><a href="#">Browse </a></span> <span><KeyboardArrowDownIcon/></span>
                                <span><a href="#">Search</a></span>
                                <span><a href="#">My Account</a></span> <span><KeyboardArrowDownIcon/></span>
                            </div>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
       );
export default Header;