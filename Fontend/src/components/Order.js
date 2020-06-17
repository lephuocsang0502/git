import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import{Button, ButtonToolbar} from 'react-bootstrap';
import{AddOrderModal} from './AddOrderModal';
import{EditOrderModal} from './EditOrderModal';
import{SolveOrderModal} from './SolveOrderModal';
import axios from 'axios';

export class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {orders:null, addModalShow: false, editModalShow: false,isSignal : false, showSolveOrder: false
          // id:'',
          // typeclient:'',
          // name:'',
          // cmnd:'',
          // address:'',
          // dateagent:'',
          // roomnum:'',
          // datesolve:''
        
        }
      }
    
      componentDidMount() {
        this.refreshList();
    
      }
    
      refreshList =() => {
        axios.get('/getDataOrder')
          .then((res) => res.data)
          .then((res) => {
            this.setState({ orders: res });
          })
      }

      // pushPropertyToSolvePage = (ord) => {
       
      //   console.log("id",ord.ID)
      
      //   this.setState({showSolveOrder:true,
      //     id:ord.ID, typeclient:ord.TypeClient,
      //     name:ord.Name,cmnd:ord.CMND,address:ord.Address,dateagent:ord.DateAgent,datesolve:ord.DateSolve,roomnum:ord.roomnum
      //   })
        
      // }
    
      getValueCallBack = (value) => {
        console.log(value)
        if(value === "OK") {
          this.refreshList();
        }
      }
      // componentDidUpdate (){
      //   this.refreshList();
      // }
      deleteEmp(id){
        if(window.confirm('are u sure?'))
        {
          fetch('/deforder/'+id,{
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
      const { id,name,roomnum,dateagent,datesolve,typeclient,cmnd,address,days,price,total}=this.state;
    
      

      let editModalClose=()=>this.setState({editModalShow:false});
      let solveModalClose=()=>this.setState({showSolveOrder:false});
      if (this.state.orders !== null){
        return this.state.orders.map((ord,key)=>{
          return(<tr key={ord.ID}>
            <td>{ord.ID}</td>
            <td>{ord.roomnum}</td>
            <td>{ord.DateAgent}</td>      
            <td>{ord.Name}</td>               
            <td>{ord.TypeClient}</td>
            <td>{ord.CMND}</td>
            <td>{ord.Address}</td>
            <td>{ord.DateSolve}</td>
            
          
            <td>
            <ButtonToolbar>
            <Button
            className="mr-2" variant="info"
            onClick={()=> this.setState({editModalShow:true,
              id:ord.ID, 
              typeclient:ord.TypeClient,             
              cmnd:ord.CMND,
              address:ord.Address,           
              roomnum:ord.roomnum,
              name:ord.Name,
              dateagent:ord.DateAgent

            })}
            >
            Edit
            </Button>

            <Button 
            className="mr-2" variant="info"
            onClick={()=> this.setState({showSolveOrder:true,
              id:ord.ID, 
              typeclient:ord.TypeClient, 
              datesolve:ord.DateSolve,
              name:ord.Name,
              cmnd:ord.CMND,
              address:ord.Address,
              dateagent:ord.DateAgent,
              roomnum:ord.roomnum,
              days:ord.Days,
              price:ord.Price,
              total:ord.Total
            })}
            >
            Thanh toán
            </Button>
          
            <Button className="mr-2"
            onClick={()=> this.deleteEmp(ord.ID)}
            variant="danger"
            >Delete
            </Button>
          
            <EditOrderModal
            // orders={ord}
            show={this.state.editModalShow}
            onHide={editModalClose}
            id={id}
            dateagent={dateagent}
            cmnd={cmnd}
            typeclient={typeclient}
            roomnum={roomnum}
            name={name}
            address={address}
            callback={this.getValueCallBack}
            />
           <SolveOrderModal
           orders={ord}
            show={this.state.showSolveOrder}
            onHide={solveModalClose}
            id={id}
            dateagent={dateagent}
            cmnd={cmnd}
            datesolve={datesolve}
            typeclient={typeclient}
            roomnum={roomnum}
            name={name}
            address={address}
            days={days}
            price={price}
            total={total}
            callback={this.getValueCallBack}
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
          <th>Ngày Trả</th>        
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
      refreshList={this.refreshList}
      callback={this.getValueCallBack}
      onHide={addModalClose}/>
    </ButtonToolbar>
    </div>
        );
      }
}

export default Order;