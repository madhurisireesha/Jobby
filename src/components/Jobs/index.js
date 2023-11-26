import './index.css'
import { Component } from 'react'
import Cookies from 'js-cookie'
import Jobslist from '../Jobslist'
import Header from '../Header'
import Loader from 'react-loader-spinner'
const employmentTypesList = [
      {
        label: 'Full Time',
        employmentTypeId: 'FULLTIME',
      },
      {
        label: 'Part Time',
        employmentTypeId: 'PARTTIME',
      },
      {
        label: 'Freelance',
        employmentTypeId: 'FREELANCE',
      },
      {
        label: 'Internship',
        employmentTypeId: 'INTERNSHIP',
      },
    ]
    
    const salaryRangesList = [
      {
        salaryRangeId: '1000000',
        label: '10 LPA and above',
      },
      {
        salaryRangeId: '2000000',
        label: '20 LPA and above',
      },
      {
        salaryRangeId: '3000000',
        label: '30 LPA and above',
      },
      {
        salaryRangeId: '4000000',
        label: '40 LPA and above',
      },
    ]
    
class Jobs extends Component{
    state={
        profiledata:[],
        jobslist:[],
        salaryRange:'',
        searchInput:'',
        typelist:[],
        isLoading:"true"
    }
    componentDidMount=()=>{
        this.getProfileDetails()
    }
    
    getProfileDetails=async()=>{
        const token=Cookies.get('token')
        const options={
            headers:{
                Authorization:`Bearer ${token}`
            },
            method:'GET',
         }
        const response=await fetch('https://apis.ccbp.in/profile',options)
        const data=await response.json()
        //console.log(data.profile_details)
        if(response.ok===true)
        { 
             this.getJobDetails()
            const updateddata={
                profileDetails:{
                    name:data.profile_details.name,
                    profileImage:data.profile_details.profile_image_url,
                    bio:data.profile_details.short_bio
    
                }
            }
           
            this.setState({
                profiledata:updateddata.profileDetails
            })
            
        }
        else{
            this.onFailure()
        }
}
onFailure=()=>(
    <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png " className='fail' alt="fail"/>
)
checkInput=(event)=>{
   //console.log(event.target.value)
   
    this.setState(prevState=>({
        typelist:[...prevState.typelist,event.target.value]
    }),this.getJobDetails)
    
}
checkSalary=(event)=>{
    this.setState({
        salaryRange:event.target.value
    },this.getJobDetails)
}
onChangeSearchInput=(event)=>{
    this.setState({
        searchInput:(event.target.value).toLowerCase()
        
    },this.getJobDetails)
    
}
getJobDetails=async()=>{
  this.setState({
    isLoading:false
  })
    const{typelist,salaryRange,searchInput}=this.state
    //console.log(typelist)
    const token=Cookies.get('token')
    const apiurl = `https://apis.ccbp.in/jobs?search=${searchInput}&minimum_package=${salaryRange}&employment_type=${typelist.join()}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response=await fetch(apiurl,options)
    if(response.ok===true)
    {
        const data=await response.json()
        const updateddata=data.jobs.map((item)=>({
            companyLogo:item.company_logo_url,
            employmentType:item.employment_type,
            id:item.id,
            description:item.job_description,
            location:item.location,
            pack:item.package_per_annum,
            rating:item.rating,
            title:item.title
        }))
        
        this.setState({
            jobslist:updateddata
        })
       
    }
   
     
    if(response.status===404)
    {
        <img src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png" alt="nojobs" className='nojobs'/>
    }
}



    render(){
        const{profiledata,jobslist,isLoading}=this.state
      
        //console.log(jobslist)
        //console.log(searchInput)
        
        return(
            <> <Header/>
            <div className="jobcontainer">
               {isLoading?<Loader type="TailSpin" color="#00bfff" width={50} height={50} className="load"/>:
              <> <div className="jobone">
               <div className='profilecontainer'>
                    <img src={profiledata.profileImage} alt="profile"/>
                          <h2>{profiledata.name}</h2>
                          <p>{profiledata.bio}</p>
                         
               </div>
               <hr/>
               <div className='employeecontainer'>
               <h2 style={{color:"white"}}>Types Of Employment</h2>
                  {employmentTypesList.map((each)=>(
                     <div className='empinner'>
                     
                       <div><input type="checkbox" id={each.label} className='emp' value={each.employmentTypeId}style={{marginRight:"15px"}}
                       onChange={this.checkInput}
                       />
                       <label htmlFor={each.label}>{each.label}</label></div>
                     
                     </div>
                  ))}
               </div>
               <hr/>
               <div className='salarycontainer'>
               <h2 style={{color:"white"}}>Salary Range</h2>
                  {salaryRangesList.map((each)=>(
                     <div className='empinner'>
                     
                       <div><input type="radio" id={each.label} className='emp' name="radi" value={each.salaryRangeId}style={{marginRight:"15px"}}
                       onChange={this.checkSalary}
                       />
                       <label htmlFor={each.label}>{each.label}</label></div>
                     
                     </div>
                  ))}
               </div>
           </div>
           <div className="jobtwo">
              <div className='jobtwoone'>
                  <input type="search" onChange={this.onChangeSearchInput} className='searchval' placeholder="Search"/>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrMDAytmG2vi5f4mIssRd7VVUSHCs0l-w0Vg&usqp=CAU" alt="mag" className='mag'/>
              </div>
              <div className='jobtwotwo'>
                  {jobslist.map((each)=>(
                      <Jobslist details={each} key={each.id}  />
                  ))}
              </div>

           </div>
               </>
               }
                 
            </div>
            </>
         )
    }
}

export default Jobs