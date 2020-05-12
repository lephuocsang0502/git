import React from 'react';
import {Modal,Button,Row,Col,Form} from'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
// import axios from 'axios';

// const editProductAction=(type,price,Idtype)=>{
//   return axios.put('/update/',{type,price,Idtype})
//   .then((resp)=>resp.data);
// }


export class EditDepModal extends React.Component {
  constructor(props) {
    super(props);
    this.state ={ 
      deps:[],    
    snackbaropen: false,snackbarmsg:''};
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  snackbarClose=(event)=>{
    this.setState({snackbaropen: false});
  }
 

  handleSubmit(event){
    event.preventDefault();
      fetch('/update/'+event.target.Idtype.value,{
        method:'PUT',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          Idtype:event.target.Idtype.value,
          type: event.target.type.value,
          price: event.target.price.value
        })
      })
      .then(res=>res.json())
      .then((result)=>
      {
        //alert(result);
        this.setState({snackbaropen:true, snackbarmsg: result})
      },
      (error)=>{
        this.setState({snackbaropen:true, snackbarmsg: 'success'})
      }
    )
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
        Edit Department
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>


      <Row>
        <Col sm={6}>
        <Form onSubmit={this.handleSubmit} >

        <Form.Group controlId="Idtype">
        <Form.Label>Idtype ID</Form.Label>
        <Form.Control
            type="text"
            name="Idtype"
            // onChange={(event)=>this.isChange(event)}
            required
            disabled
            defaultValue={this.props.depid}
            placeholder="Idtype ID"/>
        </Form.Group>


        <Form.Group controlId="type">
        <Form.Label>Department Name</Form.Label>
        <Form.Control
            type="text"
            name="type"
            // onChange={(event)=>this.isChange(event)}
            required
            defaultValue={this.props.deptype}
            placeholder="type"/>
        </Form.Group>

        <Form.Group controlId="price">
        <Form.Label>Price </Form.Label>
        <Form.Control
            type="text"
            name="price"
            // onChange={(event)=>this.isChange(event)}
            required
            defaultValue={this.props.depprice}
            placeholder="price"/>
        </Form.Group>


        <Form.Group>
          <Button variant="primary" type="submit"  >
          Update Department</Button>
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
export default EditDepModal;
