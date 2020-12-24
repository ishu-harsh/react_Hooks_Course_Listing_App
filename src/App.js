import React , {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, Modal, Form } from 'react-bootstrap';

const courseUrl = "http://localhost:4000/courses"
const enquiryUrl = "http://localhost:4000/enquiry"


const App  =()=>{

 
      const [show, setShow] = useState(false)
      const [email, setEmail] = useState("")
      const [name, setName] = useState("")
      const [message, setMessage] = useState("")
      const [selectedCourses, setSelectedCourses] = useState("")
      
      
      

      
      const [courses, setCourses] = useState([])
      const [courseId, setCourseId] = useState(0)

      
  useEffect( async ()=>{
    let response = await axios(courseUrl)
    console.log(response.data)
    setCourses(response.data)
    console.log(courses)

  },[courseId])

  const handleEmail =  (event)=>{
    setEmail(event.target.value)
   console.log(email)
  }

  const handleName =  (event)=>{  
   setName(event.target.value)
   console.log(name)
 }

 const handleMessage =  (event)=>{
   setMessage(event.target.value)
   console.log(message)
 }

 const handleSelectCourse =  (e)=>{
   let selectArray = Array.from(e.target.selectedOptions, option => option.value)
    setSelectedCourses(selectArray)
   
 }



 const handleSubmit = async()=>{
   let enquiryObj = {
     name : name,
     email : email,
     message : message,
     courses : selectedCourses,
     id : Number(Math.floor(Math.random() * 10000) + 10000).toString().substring(1)
   }
  await axios.post(enquiryUrl, enquiryObj)
 }

 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);

 const renderCourses = ()=>{
  return courses.map(item=>{
    console.log(item)
    return(
       <div key={item.id} class="card col-sm-4" style={{width: "18rem"}}>
         <img src={item.img} class="card-img-top"/>
         <div class="card-body">
         <h5 class="card-title">{item.title}</h5>
         <p class="card-text">{item.description}</p>
         <strong>Rs. {item.price}</strong>
         <Button variant="primary" onClick={handleShow}>Enquiry</Button>
     </div>
   </div>
    )
  })
 }


   return (
     <React.Fragment>
       <div className="row">
         <p>page</p>
            {renderCourses()}
            <Modal show={show} onHide={handleClose}>
         <Modal.Header >
           <Modal.Title>Enquiry</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <Form>
               <Form.Group controlId="exampleForm.ControlInput1">
                 <Form.Label>Name </Form.Label>
                 <Form.Control placeholder="First name" onChange={handleName} />
               </Form.Group>
               <Form.Group controlId="exampleForm.ControlInput1">
                 <Form.Label>Email address</Form.Label>
                 <Form.Control type="email" placeholder="name@example.com" onChange={handleEmail} />
               </Form.Group>
               <Form.Group controlId="exampleForm.ControlTextarea1">
                 <Form.Label>Message</Form.Label>
                 <Form.Control as="textarea" rows={3} onChange={handleMessage}/>
               </Form.Group>
               
               <Form.Group controlId="exampleForm.ControlSelect2">
               <Form.Label>Select Courses</Form.Label>
               <Form.Control onChange={handleSelectCourse} as="select" multiple>
              {/* {console.log(item.title)} */}
               {/* <option>{item.title}</option> */}
                             {courses.map(item1=>{ return (<option>{item1.title}</option>)})}
               </Form.Control>
             </Form.Group>
           </Form>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={handleClose}>
             Close
           </Button>
           <Button variant="primary" onClick={handleSubmit}>Send</Button>
         </Modal.Footer>
       </Modal>
            </div>
     </React.Fragment>
   )
}



export default App;
