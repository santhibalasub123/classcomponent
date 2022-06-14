import './Dashboard.css';
import { Component } from 'react';
import axios from 'axios';
import Modal from './Modal.js';
import { Link, withRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

class Dashboard extends Component{

      constructor(props){
        super(props);
        this.state={
          modal:false,
          list:[],
          index:-1,
          search:'',
          expense:{
                expenseName:'',
    amount:'',
    paidBy:'',
    date:''
          }
        }
      }

      componentDidMount(){
              axios.get('http://localhost:3000/').then((response)=>{
          console.log(response.data)
        this.setState({list:response.data});
      }).catch((error)=>{
        console.log(error);
      }) 
      }

        onDeleteHandler=(index)=>{
       let expenseDetails = [...this.state.list];
       let id = expenseDetails[index].id;
       axios.delete('http://localhost:3000/myclasscomponent/'+id).then((response)=>{
        expenseDetails.splice(index,1);
        this.setState({list:expenseDetails});
       }).catch(()=>{

       })
      // sessionStorage.setItem('expenseDetails',JSON.stringify(expenseDetails));
     }

      onEditHandler=(index)=>{
      this.setState({expense:{
        expenseName:this.state.list[index].expenseName,
        amount:this.state.list[index].amount,
        paidBy:this.state.list[index].paidBy,
        date:this.state.list[index].date
      },
      index:index
    })
     }

      onChangeHandler=(event)=>{
      this.setState({expense:{
        ...this.state.expense,[event.target.name]:event.target.value
      }})
    }

    onChangeSearchHandler=(event)=>{
      this.setState({search:event.target.value});
    }

      onEditSubmitHandler=(event)=>{
      event.preventDefault();
      let expenseDetails =[...this.state.list];
      let id= expenseDetails[this.state.index].id;
      axios.patch('http://localhost:3000/myclasscomponent/'+id,{
        expenseName:this.state.expense.expenseName,
        amount:this.state.expense.amount,
        paidBy:this.state.expense.paidBy,
        date:this.state.expense.date
      }).then(()=>{
        this.setState({list:expenseDetails});
        expenseDetails[this.state.index].expenseName = this.state.expense.expenseName;
        expenseDetails[this.state.index].amount=this.state.expense.amount;
        expenseDetails[this.state.index].paidBy = this.state.expense.paidBy;
        expenseDetails[this.state.index].date = this.state.expense.date;
      }).catch(()=>{

      })
    
     
     // sessionStorage.setItem('expenseDetails',JSON.stringify(expenseDetails));
    }

        searchFilter=(event)=>{
      event.preventDefault();
      let details = this.state.list.filter((obj)=>{
        return obj.expenseName === this.state.search; 
      })
      this.setState({list:details});
    }

    resetFilter=(event)=>{
        event.preventDefault();
        this.setState({search:''});
        if(JSON.parse(sessionStorage.getItem('expenseDetails')) && JSON.parse(sessionStorage.getItem('expenseDetails')).length>0){
          this.setState({list:JSON.parse(sessionStorage.getItem('expenseDetails'))})
       }
    }

    onCloseHandler=()=>{
      this.setState({modal:!this.state.modal});
    }

    render(){
          return (<div>
       <div className="container-fluid">
       {this.state.modal && <Modal text={"display"} onSubmit={this.onEditSubmitHandler} getValidation={"validation"} getForm={this.state.expense}  onUpdate={this.onChangeHandler} onClose={this.onCloseHandler} />}
              <div className="row">
                <div className="col-3">
                    <form>        
                        <div className="form-group">
                          <label>Expense name</label>
                          <input type="text" value={this.state.search} onChange={this.onChangeSearchHandler} className="form-control" id="expenseName" name="searchExpenseName" placeholder="Enter expenseName"/>
                        
                        </div>       
                        <button onClick={this.searchFilter} type="submit" className="btn btn-success">Search</button>
                        <button onClick={this.resetFilter}>Reset</button>
                      </form>
                </div>
                <div className="col-7"></div>
                <div className="col-2">
                <button type="submit" className="btn btn-success">LInk expense</button>
                </div>
                
              </div>

              <div className="row">
                  <div className="col-12">
                    <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Expense Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Paid by</th>
                            <th scope="col">Date</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
             
                        {this.state.list.map((obj,index)=>{
                           return(<tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>{obj.expenseName}</td>
                            <td>{obj.amount}</td>
                            <td>{obj.paidBy}</td>
                            <td>{obj.date}</td>
                            <td><i onClick={()=>this.onCloseHandler()}  className="fa fa-pencil-square-o" aria-hidden="true"></i></td>
                            <td><i onClick={()=>this.onDeleteHandler(index)} className="fa fa-trash" aria-hidden="true"></i></td>
                          </tr>

                           )
                        })

                        }
                        
                        
                 
                 
                
                       
                        </tbody>
                      </table>
                  </div>
              </div>
     
          </div>

 
          <div className="modal fade" id="edit"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
        <form>
                      <div className="form-group">
                          <label>Expense Name</label>
                          <input type="text"  value={this.state.expense.expenseName} onChange={this.onChangeHandler} name="expenseName" className="form-control" id="firstName"  placeholder="Enter first name"/>
                        </div>
                        <div className="form-group">
                          <label>Amount</label>
                          <input  value={this.state.expense.amount} onChange={this.onChangeHandler} type="text" name="amount" className="form-control" id="lastName"  placeholder="Enter last name"/>
                        </div>
                        
                      <div className="form-group">
                        <label>Paid By</label>
                        <input value={this.state.expense.paidBy} onChange={this.onChangeHandler} type="text" name="paidBy" className="form-control" id="email" placeholder="Enter email"/>
                      
                      </div>
                      <div className="form-group">
                        <label>Date</label>
                        <input value={this.state.expense.date} onChange={this.onChangeHandler} type="date"  name="date" className="form-control" id="password" placeholder="Password"/>
                      </div>
                  
                      <button data-dismiss="modal" onClick={this.onEditSubmitHandler} type="submit" className="btn btn-success">ADD</button>
                    </form>
        </div>
       
      </div>
    </div>
  </div>
    </div>)
    }
}
export default Dashboard;