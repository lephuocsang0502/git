import React from 'react';
import {Modal,Button,Row,Col,Form} from'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditEmpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state ={deps:[], snackbaropen: false,snackbarmsg:'',selectedType : 'A'};
    this.handleSubmit= this.handleSubmit.bind(this);
  }
  componentDidMount(){
    fetch('getData')
    .then(response => response.json())
    .then(data => {
      this.setState({deps:data});
    });
  }

  snackbarClose=(event)=>{
    this.setState({snackbaropen: false});
  }

  handleSubmit(event){
    event.preventDefault();
      fetch('/updateroom/'+event.target.Idroom.value,{
        method:'PUT' ,
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          Idroom:event.target.Idroom.value,
          roomnum: event.target.roomnum.value,
          type: event.target.type.value,
          price: event.target.price.value,
          note: event.target.note.value


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
        this.setState({snackbaropen:true, snackbarmsg: 'fail'})
      }

    )

    this.props.callback("OK")
  }

  render() {
    const filterDepType = this.state.deps.filter(e => e.type === this.state.selectedType);
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
        Edit Employee
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>


      <Row>
        <Col sm={6}>
        <Form onSubmit={this.handleSubmit}>

        <Form.Group controlId="Idroom">
        <Form.Label>EmployeeID</Form.Label>
        <Form.Control
            type="text"
            name="Idroom"
            required
            disabled
            defaultValue={this.props.idroom}
            placeholder="EmployeeID"/>
        </Form.Group>

        <Form.Group controlId="roomnum">
        <Form.Label>Room Number</Form.Label>
        <Form.Control
            type="text"
            name="roomnum"
            required
              defaultValue={this.props.roomnum}
            placeholder="Room Number"/>
        </Form.Group>

        <Form.Group controlId="type">
        <Form.Label>Department</Form.Label>
        <Form.Control as="select"   defaultValue={this.props.typeroom}
         onChange={(e) => this.setState({selectedType : e.target.value})}
        >
        {this.state.deps.map(dep=>
        <option key={dep.type}>{dep.type}</option>
        )}
        </Form.Control>
        </Form.Group>

        <Form.Group controlId="price">
        <Form.Label>MailID</Form.Label>
        <Form.Control as="select" value={this.state.selectedType}
        defaultValue={this.props.price}>
        {filterDepType.map(dep=>
          <option key={dep.type}>{dep.price}</option>
        )}
        </Form.Control>
        </Form.Group>

        <Form.Group controlId="note">
        <Form.Label>DOJ</Form.Label>
        <Form.Control
           
            name="note"
            required
              defaultValue={this.props.note}
            placeholder="note"/>
        </Form.Group>
        <Form.Group>
          <Button variant="primary" type="submit">Update Employee</Button>
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

export default EditEmpModal;
