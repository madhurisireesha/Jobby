import { Link } from "react-router-dom"
import './index.css'
const Jobslist=(props)=>{
    const{details}=props
    const{companyLogo,employmentType,description,id,location,pack,title,rating}=details
    
    return(
        <div className="joblist">
            <Link  className="linki" to={`/jobs/${id}`}>
            <div className="rowone">
                <div className="rowone1">
                    <img src={companyLogo} alt="logo" className="logo1" />
                </div>
                <div className="rowone2">
                    <h2 style={{color:"white"}}>{title}</h2>
                    <div className="rating">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY1vpRJxxU53MUVYFP3yUB9zV7JLmreSmQNQ&usqp=CAU" alt="star" className="star"/>
                        <p style={{color:"white",marginLeft:"10px"}}>{rating}</p>
                    </div>
                </div>
            </div>
                <div className="rowtwo">
                    <div className="location">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_lyMfnL4YqRAIDLeeyjNlPCD0NQ2zrdk9ug&usqp=CAU" alt="location" className="loc"/>
                        <p style={{color:"white",marginLeft:"10px"}}>{location}</p>
                    </div>
                    <div className="location">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZO8RJIW7Ua5tuORmXRi_mhi6BV6kh-6M0ag&usqp=CAU" alt="emptype" className="emp"/>
                        <p style={{color:"white",marginLeft:"10px"}}>{employmentType}</p>
                    </div>
                    <p style={{color:"white"}}>Package:{pack}</p>
                </div>
                <div className="rowthree">
                    <p style={{color:"white"}}>{description}</p>
                </div>
            </Link>
        </div>
    )
}
export default Jobslist