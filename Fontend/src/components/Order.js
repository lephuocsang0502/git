import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import{Button, ButtonToolbar} from 'react-bootstrap';
import{AddOrderModal} from './AddOrderModal';
import{EditEmpModal} from './EditEmpModal';
import axios from 'axios';

export class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {emps:null, addModalShow: false, editModalShow: false,isSignal : false}
      }
    
      componentDidMount() {
        this.refreshList();
    
      }
    
      refreshList =() => {
        axios.get('/getData01')
          .then((res) => res.data)
          .then((res) => {
            this.setState({ emps: res });
          })
      }
    
      getValueCallBack = (value) => {
        console.log(value)
        if(value === "OK") {
          this.refreshList();
        }
      }
      // componentDidUpdate (){
      //   this.refreshList();
      // }
      deleteEmp(idroom){
        if(window.confirm('are u sure?'))
        {
          fetch('/defroom/'+idroom,{
            method:'DELETE',
            headers:{
              'Accept':'application/json',
            'Content-Type':'application/json'}
          }).then(res => {
            if(res) {
              this.refreshList()
            }
          }).catch(e =>console.log(e))
        }
      }
    showRoom =()=>{
      const { idroom, typeroom,roomnum,price,note}=this.state;
      let editModalClose=()=>this.setState({editModalShow:false});
      if (this.state.emps !== null){
        return this.state.emps.map((emp,key)=>{
          return(<tr key={emp.Idroom}>
            <td>{emp.Idroom}</td>
            <td>{emp.type}</td>
            <td>{emp.roomnum}</td>
            <td>{emp.price}</td>
            <td>{emp.note}</td>
            <td>
            <ButtonToolbar>
            <Button
            className="mr-2" variant="info"
            onClick={()=> this.setState({editModalShow:true,
              idroom:emp.Idroom, typeroom:emp.type,
              roomnum:emp.roomnum,price:emp.price,note:emp.note,
            })}
            >
            Edit
            </Button>
          
            <Button className="mr-2"
            onClick={()=> this.deleteEmp(emp.Idroom)}
            variant="danger"
            >Delete
            </Button>
          
            <EditEmpModal
            show={this.state.editModalShow}
            onHide={editModalClose}
            idroom={idroom}
            typeroom={typeroom}
            roomnum={roomnum}
            price={price}
            note={note}
            />
          
            </ButtonToolbar>
            </td>
            </tr>)
        })
      }
      
    }
    
    
    
      render() {
      
        let addModalClose=()=>this.setState({addModalShow:false});
       
        return (
          <div>
    <Table className="mt-4" striped bordered hover size="sm">
    <thead>
      <tr>
          <th>ID Order</th>
          <th>Room Number</th>
          <th>Ngày thuê</th>
          <th>Khách hàng</th>
          <th>Loại Khách</th>
          <th>CMND</th>
          <th>Địa Chỉ</th>
          <th>Option</th>
    
      </tr>
    
    </thead>
    <tbody>
    {this.showRoom()}
    </tbody>
    </Table>
    
    <ButtonToolbar>
      <Button
        variant='primary'
        onClick={()=> this.setState({addModalShow:true})}
        >Add Order</Button>
    
      <AddOrderModal show={this.state.addModalShow}
      callback={this.getValueCallBack}
      onHide={addModalClose}/>
    </ButtonToolbar>
    </div>
        );
      }
}

export default Order;