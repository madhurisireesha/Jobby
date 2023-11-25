import './index.css'
const Similarjobs=(props)=>{
    const{each}=props
    const{companyLogo,employmentType,location,rating,title,description}=each
    return(
       <div className="similarcontainer">
            <div className='items'>
                <div className='sone'>
                    <div className='logo'>
                        <img src={companyLogo} alt="comlogo" className='clogo'/>
                        <div className='logd'>
                            <h3 style={{color:"white"}}>{title}</h3>
                            <div className='rat'>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY1vpRJxxU53MUVYFP3yUB9zV7JLmreSmQNQ&usqp=CAU" className='star' alt="rati"/>
                                <p style={{color:"white"}}>{rating}</p>
                            </div>
                        </div>
                        <h2 style={{color:"white"}}>Description</h2>
                        <p style={{color:"white"}}>{description}</p>
                    </div>
                    <div className="locatione">
                    <div className="loc">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_lyMfnL4YqRAIDLeeyjNlPCD0NQ2zrdk9ug&usqp=CAU" className="loc" alt="location"/>
                            <p style={{color:"white"}}>{location}</p>
                        </div>
                        <div className="location">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZO8RJIW7Ua5tuORmXRi_mhi6BV6kh-6M0ag&usqp=CAU" className="loc" alt="location"/>
                            <p style={{color:"white"}}>{employmentType}</p>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    )
}
export default Similarjobs