import React from 'react';
import {Modal,Button,Row,Col,Form} from'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


export class AddEmpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state ={deps:[], snackbaropen: false,snackbarmsg:'', selectedType : 'A'};
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
          Idroom:null,
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
        this.setState({snackbaropen:true, snackbarmsg: 'success'})
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
        Add Employee
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>


      <Row>
        <Col sm={6}>
        <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="roomnum">
        <Form.Label>RoomNumber</Form.Label>
        <Form.Control
            type="text"
            name="roomnum"
            required
            placeholder="RoomNumber"/>
        </Form.Group>

        <Form.Group controlId="type">
        <Form.Label>TypeRoom</Form.Label>
        <Form.Control as="select"
          onChange={(e) => this.setState({selectedType : e.target.value})}
        >
        {this.state.deps.map(dep=>
        <option key={dep.type}>{dep.type}</option>
        )}
        </Form.Control>
        </Form.Group>

        <Form.Group controlId="price" >
        <Form.Label>Price</Form.Label>
        <Form.Control as="select" value={this.state.selectedType}>
        {filterDepType.map(dep=>
          <option key={dep.type}>{dep.price}</option>
        )}
        </Form.Control>
        </Form.Group>

        <Form.Group controlId="note">
        <Form.Label>Note</Form.Label>
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

export default AddEmpModal;
