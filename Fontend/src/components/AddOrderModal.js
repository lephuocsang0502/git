import React, { Component } from 'react';
import {Modal,Button,Row,Col,Form} from'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

export class AddOrderModal extends Component {
    constructor(props) {
        super(props);
        this.state ={
          clents:[],
          emps:[],
          deps:[], 
          snackbaropen: false,
          snackbarmsg:'', 
          selectedNum : '101'
          // roomnum:'',
          // empType:'',
          // CMND:'',
          // Address:'',
          // Name:'',
          // DateAgent: ''
        };
        this.handleSubmit= this.handleSubmit.bind(this);
      }
    
      changeStatus=(Idroom)=>{
        return axios.put('/updatestatusroom/'+Idroom)
        .then((resp)=>resp.data);
      }

      onChangeHandle = (e) => {
        this.setState({[e.target.name] : e.target.value})
      }

      // componentWillUnmount(){
      //   console.log(this.props)
      //   fetch('/getData')
      //   .then(response => response.json())
      //   .then(data => {
      //     this.setState({deps:data});
      //   });
      // }
     
      componentDidMount(){
        console.log(this.state)
        fetch('/getDataTypeClient')
        .then(response => response.json())
        .then(data => {
          this.setState({clents:data});
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
        // const {roomnum,empType,Address,Name,CMND,DateAgent} = this.state
          fetch('/addorder ',{
            method:'POST' ,
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              ID:null,
              roomnum: event.target.roomnum.value,
              DateAgent: event.target.DateAgent.value,
              TypeClient: event.target.TypeClient.value,
              CMND: event.target.CMND.value,
              Name:event.target.Name.value,
              Address:event.target.Address.value,
              Price:event.target.Price.value
            })
          })
          .then(res=>res.json())
          .then((result)=>
          {
            const room = this.state.emps.find(e => e.roomnum === this.state.roomnum);
           
            this.changeStatus(room.Idroom)
            this.setState({snackbaropen:true, snackbarmsg: result})
            this.props.refreshList()
          
        }).catch(e => console.log(e))
    
        this.props.callback("OK")
      }
      
    
      render() {
        const filterDepNum = this.state.emps.filter(e => e.roomnum === this.state.selectedNum);
        
        return (
              <div className="container">
              <Snackbar
              anchorOrigin={{vertical:'bottom', horizontal:'center'}}
              open={this.state.snackbaropen}
              autoHideDuration={3000}
              onClose={this.snackbarClose}
              // message={this.state.snackbarmsg}
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
            Add Order
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
    
    
          <Row>
            <Col sm={6}>
            <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="roomnum">
            <Form.Label>RoomNumber</Form.Label>
            <Form.Control as="select" name="roomnum"
            onChange={(e) => this.setState({selectedNum : e.target.value})}
             
            >
            {this.state.emps.map(emp=>
            <option key={emp.roomnum}>{emp.roomnum}</option>
            )}
            </Form.Control>
            </Form.Group>

            <Form.Group controlId="Price" >
            <Form.Label>Price</Form.Label>
            <Form.Control as="select" value={this.state.selectedNum}>
            {filterDepNum.map(emp=>
              <option key={emp.roomnum}>{emp.price}</option>
            )}
            </Form.Control>
            </Form.Group>
    
            <Form.Group controlId="TypeClient">
            <Form.Label>Loại Khách</Form.Label>
            <Form.Control as="select" name="TypeClient"
               onChange={this.onChangeHandle}
            >
            {this.state.clents.map(client=>
            <option key={client.TypeClient}>{client.TypeClient}</option>
            )}
            </Form.Control>
            </Form.Group>

            <Form.Group controlId="CMND">
            <Form.Label>CMND</Form.Label>
            <Form.Control
            pattern="[0-9]"
            onChange={this.onChangeHandle}
                type="number"
                name="CMND"
                required
                placeholder="CMND "/>
            </Form.Group>

            <Form.Group controlId="Address">
            <Form.Label>Địa Chỉ</Form.Label>
            <Form.Control
            onChange={this.onChangeHandle }
                type="text"
                name="Address"
                required
                placeholder="Địa chỉ "/>
            </Form.Group>
               
            <Form.Group controlId="Name">
            <Form.Label>Khách hàng</Form.Label>
            <Form.Control
                //type="date"
                onChange={this.onChangeHandle}
                name="Name"
                required
                placeholder="Tên khách hàng"/>
            </Form.Group>

            <Form.Group controlId="DateAgent">
            <Form.Label>Ngày thuê </Form.Label>
            <Form.Control
              onChange={this.onChangeHandle}
                type="datetime-local"
                name="DateAgent"
                required
                placeholder="Ngày thuê"/>
            </Form.Group>

            <Form.Group>
              <Button variant="primary" type="submit" >Add Order</Button>
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