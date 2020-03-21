import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const SideBarComponent = () => (
    <Grid container id="rightSidebar">
        <Grid item xs={12}>
        <Card>
        <CardActionArea style={{display:'inline-flex', marginTop:'30px'}}>
            <CardMedia 
            component="img"
            alt="Sidebar Image"
            height="70"
            width="70" 
            image="./Images/icon_1.jpg"
            />
        </CardActionArea>
            <div className="container">
                <div className="sub-title" style={{flexFlow:'column'}}>
                    <h4 style={{marginRight : 'inherit', marginBottom: '10px'}}>Track live on Risksense</h4>
                    <span className="image-dec">Lorem Ipsum is simply dummy text</span>
                </div>
            </div>
        <CardActions>
            <Button type="submit" varient="contained" color="primary">Sign Up</Button>
            <Button size="small" color="primary">Learn More...</Button>
        </CardActions>
    </Card>

        </Grid>
        <Grid item xs={12}>
        <section>
            <div className="container">
            <div className="title">
                <h4>Top Jobs</h4>
            </div>
            <div className="sub-title">
                <h5>Senior Ruby on Rails engineer</h5>
                <span>$60/hr</span>
            </div>
            <div className="description">
                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry</span>
            </div>
            <div className="sub-title">
                <h5>Senior Ruby on Rails engineer</h5>
                <span>$60/hr</span>
            </div>
            <div className="description">
                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry</span>
            </div>
        </div>
        </section>
        </Grid>
        <Grid item xs={12}>
        <section>
    <div className="container">
        <div className="title">
            <h4>Mostly viewed on this week</h4>
        </div>
        <div className="sub-title">
            <h5>Senior Ruby on Rails engineer</h5>
            <span>$60/hr</span>
        </div>
        <div className="description">
            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry</span>
        </div>
        <div className="sub-title">
            <h5>Senior Ruby on Rails engineer</h5>
            <span>$60/hr</span>
        </div>
        <div className="description">
            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry</span>
        </div>
    </div>
</section>
        </Grid>
    </Grid>
    
            
);
export default SideBarComponent;