import React , {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, Modal, Form } from 'react-bootstrap';

const courseUrl = "http://localhost:3000/courses"
const enquiryUrl = "http://localhost:3000/enquiry"


class App extends React.Component{
  constructor (){
    super()
    this.state = {
      courses : [],
      show: false,
      email : "",
      name: "",
      message: "",
      selectedCourses :[]
    }
  }



  async componentDidMount(){
    let response = await axios(courseUrl)

    this.setState({
      courses : response.data
    })
    console.log(this.state.courses  )

  }


  handleEmail =  (event)=>{
     this.setState({email: event.target.value})
    console.log(this.state.email)
  }

  handleName =  (event)=>{
    this.setState({name: event.target.value})
    console.log(this.state.name)
  }

  handleMessage =  (event)=>{
    this.setState({message: event.target.value})
    console.log(this.state.message)
  }

  handleSelectCourse =  (e)=>{
    let selectArray = Array.from(e.target.selectedOptions, option => option.value)
     this.setState({selectedCourses : selectArray}, ()=>{console.log(this.state.selectedCourses)})
    
  }

  renderCoursesTitle = ()=>{
   return this.state.courses.map(item1=>{
     console.log(item1)
      return (
        <option>{item1.title}</option>
      )
    })
      
    
  }

  handleSubmit = async()=>{
    let enquiryObj = {
      name : this.state.name,
      email : this.state.email,
      message : this.state.message,
      courses : this.state.selectedCourses,
      id : (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)
    }
   await axios.post(enquiryUrl, JSON.stringify(enquiryObj) )
  }

  handleClose = () => this.setState({show: false});
  handleShow = () => this.setState({show : true});

  renderCourses = ()=>{
   let  courseArray =  this.state.courses
   return courseArray.map(item=>{
     return(
        <div key={item.id} class="card col-sm-4" style={{width: "18rem"}}>
          <img src={item.img} class="card-img-top"/>
          <div class="card-body">
          <h5 class="card-title">{item.title}</h5>
          <p class="card-text">{item.description}</p>
          <strong>Rs. {item.price}</strong>
          <Button variant="primary" onClick={this.handleShow}>Enquiry</Button>
      </div>
    </div>
     )
   })
  }

  render(){
    return (
      <React.Fragment>
        <div className="row">
             {this.renderCourses()}
             <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header >
            <Modal.Title>Enquiry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Name </Form.Label>
                  <Form.Control placeholder="First name" onChange={this.handleName} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" onChange={this.handleEmail} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={3} onChange={this.handleMessage}/>
                </Form.Group>
                
                <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Select Courses</Form.Label>
                <Form.Control onChange={this.handleSelectCourse} as="select" multiple>
               {/* {console.log(item.title)} */}
                {/* <option>{item.title}</option> */}
                              {this.state.courses.map(item1=>{ return (<option>{item1.title}</option>)})}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>Send</Button>
          </Modal.Footer>
        </Modal>
             </div>
      </React.Fragment>
    )
  }
}

export default App;
