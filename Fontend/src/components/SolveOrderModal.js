import React, { Component } from 'react';
import {Modal,Button,Row,Col,Form} from'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';


export class SolveOrderModal extends Component {

    constructor(props) {
        super(props);
        this.state ={orders:[],emps:[], snackbaropen: false,snackbarmsg:'', selectedType : 'A',DateSolve:'',Days:''};
        this.handleSubmit= this.handleSubmit.bind(this);
      }
      onChangeHandle = (e) => {
        this.setState({[e.target.name] : e.target.value})
      }
      componentDidMount(){
        console.log(this.props)
        fetch('/getDataTypeClient')
        .then(response => response.json())
        .then(data => {
          this.setState({orders:data});
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

      changeStatus=(Idroom)=>{
        return axios.put('/updatestatusroom/'+Idroom)
        .then((resp)=>resp.data);
      }

      snackbarClose=(event)=>{
        this.setState({snackbaropen: false});
      }
    
      handleSubmit(event){
        const {roomnum,empType,Address,Name,CMND,DateAgent,DateSolve,Days,Total} = this.state
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
              Address: event.target.Address.value,
              DateSolve:event.target.DateSolve.value,
              Days:event.target.Days.value,
              Total:event.target.Total.value
             
          })
          })
          .then(res=>res.json())
          .then((result)=>
          {
            const room = this.state.emps.find(e => e.roomnum === this.state.roomnum);          
            this.changeStatus(room.Idroom)
           
            this.props.refreshList()

            this.setState({snackbaropen:true, snackbarmsg: result})
            fetch('/getDataOrder')
        .then(response => response.json())
        .then(data => {
          this.setState({emps:data});
          
        });
          },
          (error)=>{

         
            this.setState({snackbaropen:true, snackbarmsg: 'Fail'})
          }
    
        )
    
        this.props.callback("OK")
      }
    render() {
     
      console.log("a "+this.state.DateSolve);
      console.log("b "+ this.props.dateagent)
      var date1 = new Date(this.props.dateagent); 
      var date2 = new Date(this.state.DateSolve); 
     
      var Difference_In_Time = date2.getTime() - date1.getTime();
      var Days = Math.ceil((Difference_In_Time / (1000 * 3600 * 24))); 

      var Total= this.props.price* Days;

      console.log("total "+ Total) 
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
        <Modal.Header closeButton >
            
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
        onChange={this.onChangeHandle}
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
            onChange={this.onChangeHandle}
            name="roomnum"
            defaultValue={this.props.roomnum}
          >
         <option>{this.props.roomnum}</option>
          </Form.Control>
          </Form.Group>
  
          <Form.Group controlId="TypeClient">
          <Form.Label>Loại Khách</Form.Label>
          <Form.Control as="select" defaultValue={this.props.typeclient }
            onChange={(e) => this.setState({selectedType : e.target.value})}
            name="TypeClient"
            onChange={this.onChangeHandle}
          >
          <option>{this.props.typeclient}</option>
          </Form.Control>
          </Form.Group>

          <Form.Group controlId="CMND">
          <Form.Label>CMND</Form.Label>
          <Form.Control
          onChange={this.onChangeHandle}
              type="text"
              name="CMND"
              required
              defaultValue={this.props.cmnd}
              placeholder="CMND "/>
          </Form.Group>

          <Form.Group controlId="Address">
          <Form.Label>Địa Chỉ</Form.Label>
          <Form.Control
          onChange={this.onChangeHandle}
              type="text"
              name="Address"
              required
              defaultValue={this.props.address}
              placeholder="Địa chỉ "/>
          </Form.Group>
             
          <Form.Group controlId="Name">
          <Form.Label>Khách hàng</Form.Label>
          <Form.Control
          onChange={this.onChangeHandle}
              //type="date"
              name="Name"
              required
              defaultValue={this.props.name}
              placeholder="Tên khách hàng"/>
          </Form.Group>

          <Form.Group controlId="DateAgent">
          <Form.Label>Ngày thuê </Form.Label>
          <Form.Control
           onChange={this.onChangeHandle}
          
              defaultValue={this.props.dateagent}
              placeholder="Ngày thuê"/>
          </Form.Group>

          <Form.Group controlId="DateSolve">
            <Form.Label>Ngày tra </Form.Label>
            <Form.Control 
              onChange={this.onChangeHandle}
              
                type="datetime-local"
                name="DateSolve"
                
               required
                placeholder="Ngày tra"/>
            </Form.Group>
           
            
          <Form.Group controlId="Days">
            <Form.Label>So ngay thue </Form.Label>
            <Form.Control
              onChange={this.onChangeHandle}
               value={Days}
                name="Days"
               
              //  required
                placeholder="So ngay thue"/>
            </Form.Group>

            <Form.Group controlId="Total">
            <Form.Label>So ngay thue </Form.Label>
            <Form.Control
              onChange={this.onChangeHandle}
               value={Total}
                name="Total"
               
              //  required
                placeholder="Thanh tien"/>
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

export default SolveOrderModal;