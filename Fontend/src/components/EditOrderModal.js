import React, { Component } from 'react';
import {Modal,Button,Row,Col,Form} from'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


export class EditOrderModal extends Component {

    constructor(props) {
        super(props);
        this.state ={orders:[],emps:[], snackbaropen: false,snackbarmsg:'', selectedType : 'A'};
        this.handleSubmit= this.handleSubmit.bind(this);
      }
      // onChangeHandle = (e) => {
      //   this.setState({[e.target.name] : e.target.value})
      // }
      componentDidMount(){
        
        fetch('/getDataTypeClient')
        .then(response => response.json())
        .then(data => {
          this.setState({orders:data});
        });
      }
      componentWillMount(){
       
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
          fetch('/updateorder/'+event.target.ID.value,{
            method:'PUT',
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              ID:event.target.ID.value,
              roomnum: event.target.roomnum.value,
              DateAgent: event.target.DateAgent.value,
              TypeClient: event.target.TypeClient.value,
              CMND: event.target.CMND.value,
              Name: event.target.Name.value,
              Address: event.target.Address.value
              
          })
          })
          .then(res=>res.json())
          .then((result)=>
          {
            //alert(result);
            this.setState({snackbaropen:true, snackbarmsg: result})
            fetch('/getDataOrder')
        .then(response => response.json())
        .then(data => {
          this.setState({emps:data});
          
        });
          },
          (error)=>{
          //  alert('Failed')
          console.log(error)
            this.setState({snackbaropen:true, snackbarmsg: 'fail'})
          }
    
        )
    
        this.props.callback("OK")
      }
    render() {
      // const {ID, roomnum,Address,CMND,DateAgent,TypeClient,Name} = this.props.orders;
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
          Edit Order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
  
  
        <Row>
          <Col sm={6}>
          <Form onSubmit={this.handleSubmit}>

          <Form.Group controlId="ID">
        <Form.Label>EmployeeID</Form.Label>
        <Form.Control
            type="text"
            name="ID"
            required
            disabled
            defaultValue={this.props.id}
            placeholder="ID"/>
        </Form.Group>

          <Form.Group controlId="roomnum">
          <Form.Label>RoomNumber</Form.Label>
          <Form.Control as="select"
            onChange={(e) => this.setState({selectedType : e.target.value})}
            
            name="roomnum"
            defaultValue={this.props.roomnum}
          >
          {this.state.emps.map(emp=>
          <option key={emp.roomnum}>{emp.roomnum}</option>
          )}
          </Form.Control>
          </Form.Group>
  
          <Form.Group controlId="TypeClient">
          <Form.Label>Loại Khách</Form.Label>
          <Form.Control as="select" defaultValue={this.props.typeclient }
            onChange={(e) => this.setState({selectedType : e.target.value})}
            name="TypeClient"
            // onChange={this.onChangeHandle}
          >
            {/* <option>{TypeClient}</option> */}
          {this.state.orders.map(ord=>
          <option key={ord.TypeClient}>{ord.TypeClient}</option>
          )}
          </Form.Control>
          </Form.Group>

          <Form.Group controlId="CMND">
          <Form.Label>CMND</Form.Label>
          <Form.Control
              type="text"
              name="CMND"
              required
              defaultValue={this.props.cmnd}
              placeholder="CMND "/>
          </Form.Group>

          <Form.Group controlId="Address">
          <Form.Label>Địa Chỉ</Form.Label>
          <Form.Control
              type="text"
              name="Address"
              required
              defaultValue={this.props.address}
              placeholder="Địa chỉ "/>
          </Form.Group>
             
          <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control
              type="text"
              name="Name"
              required
              defaultValue={this.props.name}
              placeholder="Name "/>
          </Form.Group>

          <Form.Group controlId="DateAgent">
          <Form.Label>Ngày thuê </Form.Label>
          <Form.Control
              type="datetime-local"
              name="DateAgent"
              // onChange={this.onChangeHandle}
        
             
              defaultValue={this.props.dateagent}
              placeholder="Ngày thuê"/>
          </Form.Group>

          <Form.Group>
            <Button variant="primary" type="submit">Edit Order</Button>
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

export default EditOrderModal;