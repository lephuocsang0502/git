import React from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddDepModal } from './AddDepModal';
import { EditDepModal } from './EditDepModal';
import axios from 'axios';


export class Department extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deps: null, 
      
      addModalShow: false, editModalShow: false }
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList() {
    axios.get('/getData')
      .then((response) => response.data)
      .then((response) => {
        this.setState({ deps: response });
      })
  }
  componentDidUpdate (){
    this.refreshList();
  }

  
  deleteEmp(depid){
    if(window.confirm('are u sure?'))
    {
      fetch('/deftype/'+depid,{
        method:'DELETE',
        headers:{
          'Accept':'application/json',
        'Content-Type':'application/json'}
      })
    }
  }
  
  showType = () => {
    const { depid, deptype, depprice } = this.state;
    let editModalClose = () => this.setState({ editModalShow: false });
    if (this.state.deps !== null) {
      return this.state.deps.map((dep, key) => {
        return (<tr key={dep.Idtype}>
          <td>{dep.Idtype}</td>
          <td>{dep.type}</td>
          <td>{dep.price}</td>
          <td>
            <ButtonToolbar>
              <Button
                classtype="mr-2" variant="info"
                onClick={() => this.setState({ editModalShow: true, depid: dep.Idtype, deptype: dep.type, depprice: dep.price })}
              >
                Edit
     </Button>

              <Button classtype="mr-2"
          onClick={()=> this.deleteEmp(dep.Idtype)}
                variant="danger"
              >Delete
     </Button>

              <EditDepModal
                show={this.state.editModalShow}
                onHide={editModalClose}
                depid={depid}
                deptype={deptype}
                depprice={depprice}
              />

            </ButtonToolbar>
          </td>
        </tr>)
      })
    }
  }
  render() {


    let addModalClose = () => this.setState({ addModalShow: false });

    return (
      <div>
        <Table classtype="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID Type</th>
              <th>Type Room</th>
              <th>Price</th>
              <th>Option</th>

            </tr>

          </thead>
          <tbody>
            {this.showType()}
          </tbody>
        </Table>

        <ButtonToolbar>
          <Button
            variant='primary'
            onClick={() => this.setState({ addModalShow: true })}

          >Add Department</Button>

          <AddDepModal show={this.state.addModalShow}
            onHide={addModalClose} />
        </ButtonToolbar>
      </div>
    );
  }
}

export default Department;
