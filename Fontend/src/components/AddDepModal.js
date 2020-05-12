import React from 'react';
import {Modal,Button,Row,Col,Form} from'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

const addTypeRoom=(type,price)=>{
  return axios.post('/addtype',{type,price})
  .then((resp)=>resp.data);
}

export class AddDepModal extends React.Component {
  constructor(props) {
    super(props);
    this.state ={ 
    type:'',
    price:'',
    
    snackbaropen: false,snackbarmsg:''};
    this.handleClick= this.handleClick.bind(this);
  }
  
  isChange = (event) => {
    var name=event.target.name;
    var value=event.target.value;
    this.setState({
      [name]:value
    })
}
handleClick=()=>{
  
  var{type,price}=this.state;
  
  addTypeRoom(type,price).then((response)=>{
    console.log(response);
  })
}

  snackbarClose=(event)=>{
    this.setState({snackbaropen: false});
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
        Add Room
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>


      <Row>
        <Col sm={6}>
        <Form >
        
        <Form.Group controlId="type">
        <Form.Label>TypeRoom</Form.Label>
        <Form.Control
        onChange={(event)=>this.isChange(event)}
            type="text"
            name="type"
            required
            placeholder="TypeRoom"/>
        </Form.Group>

        <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
         onChange={(event)=>this.isChange(event)}
            type="text"
            name="price"
            required
            placeholder="Price"/>
        </Form.Group>

        <Form.Group>
          <Button onClick={()=>this.handleClick()} variant="primary" type="reset">Add Room</Button>
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

export default AddDepModal;
