import React from 'react';
import {
    AppBar
 } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import Grid from '@material-ui/core/Grid';

const Footer = () => (
    <AppBar position="static" style={{background: '#000'}} id="footer">
        <Container maxWidth="lg">
            <Grid container>
                <Grid item xs={3}>
                    <div className="container">
                        <div className="company-logo">Risk Sense</div>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div className="container">
                        <div className="title">Talent</div>
                        <div className="list-items">
                            <span><a href="#">How it works</a></span>
                            <span><a href="#">Why we're free </a></span>
                            <span><a href="#">Agencies</a></span>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div className="container">
                        <div className="title">Hubstaff</div>
                        <div className="list-items">
                            <span><a href="#">About</a></span>
                            <span><a href="#">Time Tracking </a></span>
                            <span><a href="#">Developer</a></span>
                            <span><a href="#">Resources</a></span>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div className="container">
                        <div className="title">Support</div>
                        <div className="list-items">
                            <span><a href="#">Help Center</a></span>
                            <span><a href="#">Blog </a></span>
                            <span><a href="#">FAQ</a></span>
                            <span><a href="#">Email us</a></span>
                            <span><a href="#">Terms</a></span>
                            <span><a href="#">Privacy</a></span>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3}>
                <div className="container">
                        <div className="title">Social</div>
                        <div className="social-icons">
                            <span><TwitterIcon/></span>
                            <span><FacebookIcon/></span>
                            <span><InstagramIcon/></span>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    </AppBar>
);

export default Footer;