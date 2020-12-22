import React from 'react'
import axios from 'axios'
import {Table} from 'react-bootstrap'

const enquiryUrl = "http://localhost:4000/enquiry"

class Enquiry extends React.Component{
  constructor(){
    super()
    this.state = {
        enquiry : []
    }
  }

  async componentDidMount(){
     let response = await axios.get(enquiryUrl)
     this.setState({enquiry : response.data})
    //  console.log(this.state.enquiry)
  }


  renderEnquiry = ()=>{
    return this.state.enquiry.map(item=>{
      console.log(item.name)
      return(
          <tr>
              <td>{item.id}</td>
              <td colSpan="2">{item.name}</td>
              <td>{item.email}</td>
              <td>{item.message}</td>
              <td>{item.courses.map(course =>{return course+", "})}</td>
          </tr>
      )
    })
  }

  render(){
    return (
      <React.Fragment>
            <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Courses</th>
                  </tr>
                </thead>
                <tbody>
                 {this.renderEnquiry()}
                </tbody>
            </Table>
      </React.Fragment>
    )
  }
}



  
  export default Enquiry;
  