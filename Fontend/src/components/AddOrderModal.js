import React, { Component } from 'react';
import {Modal,Button,Row,Col,Form} from'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class AddOrderModal extends Component {
    constructor(props) {
        super(props);
        this.state ={deps:[],emps:[], snackbaropen: false,snackbarmsg:'', selectedType : 'A'};
        this.handleSubmit= this.handleSubmit.bind(this);
      }
    
    
      componentDidMount(){
        console.log(this.props)
        fetch('/getData')
        .then(response => response.json())
        .then(data => {
          this.setState({deps:data});
        });
      }
      componentWillMount(){
        console.log(this.props)
        fetch('/getData01')
        .then(response => response.json())
        .then(data => {
          this.setState({emps:data});
        });
      }
    
      snackbarClose=(event)=>{
        this.setState({snackbaropen: false});
      }
    
      handleSubmit(event){
        event.preventDefault();
          fetch('/addroom',{
            method:'POST' ,
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              Idorder:null,
              roomnum: event.target.roomnum.value,
              checkin: event.target.checkin.value,
              typeclient: event.target.typeclient.value,
              cmnd: event.target.cmnd.value,
              client: event.target.client.value
    
    
            })
          })
          .then(res=>res.json())
          .then((result)=>
          {
            //alert(result);
            this.setState({snackbaropen:true, snackbarmsg: result})
            fetch('/getData01')
        .then(response => response.json())
        .then(data => {
          this.setState({deps:data});
          
        });
          },
          (error)=>{
          //  alert('Failed')
            this.setState({snackbaropen:true, snackbarmsg: 'success'})
          }
    
        )
    
        this.props.callback("OK")
      }
    
      render() {
     
        return (
              <div className="container">
              <Snackbar
              anchorOrigin={{vertical:'bottom', horizontal:'center'}}
              open={this.state.snackbaropen}
              autoHideDuration={3000}
              onClose={this.snackbarClose}
              message={<span id="message-id"> {this.state.snackbarmsg}</span>}
              action={[
                <IconButton
                key="close"
                arial-label="close"
                color="inherit"
                onClick={this.snackbarClose}
                >
                x
    
                </IconButton>
              ]}
              />
          <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Add Employee
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
    
    
          <Row>
            <Col sm={6}>
            <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="roomnum">
            <Form.Label>RoomNumber</Form.Label>
            <Form.Control as="select"
              onChange={(e) => this.setState({selectedType : e.target.value})}
            >
            {this.state.emps.map(emp=>
            <option key={emp.roomnum}>{emp.roomnum}</option>
            )}
            </Form.Control>
            </Form.Group>
    
            <Form.Group controlId="roomnum">
            <Form.Label>Loại Khách</Form.Label>
            <Form.Control as="select"
              onChange={(e) => this.setState({selectedType : e.target.value})}
            >
            {this.state.emps.map(emp=>
            <option key={emp.roomnum}>{emp.roomnum}</option>
            )}
            </Form.Control>
            </Form.Group>

            <Form.Group controlId="roomnum">
            <Form.Label>CMND</Form.Label>
            <Form.Control
                type="text"
                name="roomnum"
                required
                placeholder="RoomNumber"/>
            </Form.Group>

            <Form.Group controlId="roomnum">
            <Form.Label>Địa Chỉ</Form.Label>
            <Form.Control
                type="text"
                name="roomnum"
                required
                placeholder="RoomNumber"/>
            </Form.Group>
               
            <Form.Group controlId="note">
            <Form.Label>Khách hàng</Form.Label>
            <Form.Control
                //type="date"
                name="note"
                required
                placeholder="Note"/>
            </Form.Group>
            <Form.Group>
              <Button variant="primary" type="submit">Add Employee</Button>
            </Form.Group>
            </Form>
            </Col>
          </Row>
    
    
    
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
          </div>
        );
      }
}

export default AddOrderModal;