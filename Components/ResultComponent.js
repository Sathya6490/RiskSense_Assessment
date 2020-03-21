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
                <h4>{`Results(${totalCount})`}</h4>
                <div className="sorting">
                <Autocomplete
                id="grouped-demo"
                options={['Relavance', 'Rate']}
                getOptionLabel={option => option}
                style={{ width: 100 }}
                renderInput={params => <TextField {...params} variant="outlined" />}
                onChange={handleSortChange}
                />
                </div>
           </div>
           {data.map(jobList => (
               <div className="content" key={jobList.id}>
               <div>
                <h4 style={{margin:'0px'}}>{jobList.title}</h4>
                <span className="job-type">{jobList.jobType}</span>
                <b>{`$${jobList.salarymax}/hr`}</b>
               </div>
               <div>
                   <div className="col-blue d-flex a-i-f-e"><DomainIcon/> <span>Epic Coder</span></div>
                    <div className="col-green d-flex a-i-f-e"><LocationOnIcon/> <span style={{color:'#777'}}>{jobList.location}</span></div>
               </div>
               <div>
                   <span style={{marginBottom:'20px', marginTop: '5px'}}>Replay rate: <b>82%</b></span>
               </div>
               <div>
                    <span>{jobList.desciption}</span>
               </div>
               <div>
                    {jobList.requiredSkills.split(',').map(skill => <span key={`${jobList.id}_${skill}`} className="skills">{skill}</span>)}
               </div>

           </div>

           )) }
           <Pagination count={totalCount/5} onChange={handlePagination} variant="outlined" shape="rounded" page={currentPageNumber}/>
       </div>
   </Card>        
);
export default ResultComponent;