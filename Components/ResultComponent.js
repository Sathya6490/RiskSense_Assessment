import React from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DomainIcon from '@material-ui/icons/Domain';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Pagination from '@material-ui/lab/Pagination';

const ResultComponent = ({data, handlePagination, totalCount, handleSortChange, currentPageNumber}) => (
   <Card id="result">
       <div className="container">
           <div className="header">
                <h4>{`RESULTS(${totalCount})`}</h4>
                <div className="sorting">
                    <span style={{paddingRight:'10px'}}>Sort By </span>
                    <Autocomplete
                    defaultValue='Relavance'
                    options={['Relavance', 'Rate']}
                    getOptionLabel={option => option}
                    style={{ width: 200 }}
                    renderInput={params => <TextField {...params} variant="outlined" />}
                    onChange={handleSortChange}
                    />
                </div>
           </div>
           {data.map(jobList => (
               <div className="content" key={jobList.id} style={{marginTop: '30px'}}>
               <div>
                <h4 style={{margin:'0px'}}>{jobList.title}</h4>
                <span className={"job-type " + (jobList.jobType === 'Full Time' ? 'bg-blue' : 'bg-green')}>{jobList.jobType}</span>
                <b>{`$${jobList.salarymax}/hr`}</b>
               </div>
               <div className="font-small" style={{marginTop:'5px'}}>
                   <div className="col-blue d-flex a-i-f-e"><DomainIcon/> <span>Epic Coder</span></div>
                    <div className="col-green d-flex a-i-f-e"><LocationOnIcon/> <span style={{color:'#777'}}>{jobList.location}</span></div>
               </div>
               <div className="font-small">
                   <span style={{marginBottom:'20px', marginTop: '10px'}}>Replay rate: <b>82%</b></span>
               </div>
               <div className="font-small" style={{width:'90%'}}>
                    <span>{jobList.desciption}</span>
               </div>
               <div className="font-small border">
                    {jobList.requiredSkills.split(',').map(skill => <span key={`${jobList.id}_${skill}`} className="skills">{skill}</span>)}
               </div>

           </div>

           )) }
           {(totalCount/5 >= 1) && <Pagination count={Math.ceil(totalCount/5)} onChange={handlePagination} color="primary" shape="rounded" page={currentPageNumber} style={{marginTop:'30px'}}/>}
       </div>
   </Card>        
);
export default ResultComponent;