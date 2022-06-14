import './AddExpense.css';
// import {Link} from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function AddExpense() {

  const [getExpense, setExpense] = useState({
    BookName: '',
    BookID: '',
    AuthorName: '',
    paid: '',
    date: ''
  });

  const navigate = useNavigate();


  const onChangeHandler = (event) => {
    setExpense({
      ...getExpense, [event.target.name]: event.target.value
    })
  }
  const onAddHandler = (event) => {
    event.preventDefault();
    if (getExpense.BookName && getExpense.BookID && getExpense.AuthorName && getExpense.paid && getExpense.date) {
      axios.post('http://localhost:3000/library',{
        BookName:getExpense.BookName,
        BookID:getExpense.BookID,
        AuthorName:getExpense.AuthorName,
        paid:getExpense.paid,
        date:getExpense.date
      }).then(()=>{
        navigate('/dashboard');
      }).catch(()=>{
         alert("error");
      })

      // let expenseDetails = [];
      // if (sessionStorage.getItem('BookDetails')) {
      //   let details = JSON.parse(sessionStorage.getItem('BookDetails'));
      //   console.log(typeof details);
      //   expenseDetails.push(...details);
      //   expenseDetails.push({ ...getExpense });
      //   sessionStorage.setItem("BookDetails", JSON.stringify(expenseDetails));
      // }
      // else {
      //   expenseDetails.push({ ...getExpense });
      //   sessionStorage.setItem("BookDetails", JSON.stringify(expenseDetails));
      // }
      // navigate('/dashboard');
    }
    else {
      alert("Please add some data");
    }
  }

  return (<div>
    <div className="container">
      <div className="row">
        <div className="col-4">
        </div>
        <div className="col-4">
          <form>
            <div className="form-group">
              <center><h3> ADD BOOK  DETAILS</h3></center>
              <label>Book Name</label>
              {/* <input type="text" className="form-control" id="firstName"  placeholder="Enter first name"/> */}
              <input type="text" value={getExpense.BookName} onChange={onChangeHandler} name="BookName" className="form-control" id="firstName" placeholder="Book name" />
            </div>
            <div className="form-group">
              <label>Book Title</label>
              {/* <input type="text" className="form-control" id="lastName"  placeholder="Enter last name"/> */}
              <input value={getExpense.BookID} onChange={onChangeHandler} type="text" name="BookID" className="form-control" id="lastName" placeholder="Book Title" />
            </div>

            <div className="form-group">
              <label>Book Authorname:
              </label>
              {/* <input type="email" className="form-control" id="email" placeholder="Enter email"/> */}
              <input value={getExpense.AuthorName} onChange={onChangeHandler} type="text" name="AuthorName" className="form-control" id="email" placeholder="Book Desc" />

            </div>
            <div className="form-group">
              <label>Book Amount:
              </label>
              {/* <input type="email" className="form-control" id="email" placeholder="Enter email"/> */}
              <input value={getExpense.paid} onChange={onChangeHandler} type="text" name="paid" className="form-control" id="email" placeholder="Book Amount" />

            </div>
            <div className="form-group">
              <label>Date</label>
              {/* <input type="password" className="form-control" id="password" placeholder="Password"/> */}
              <input value={getExpense.date} onChange={onChangeHandler} type="date" name="date" className="form-control" id="password" placeholder="Date" />
            </div>



            {/* <button type="submit" className="btn btn-success"><Link to="/dashboard">ADD</Link></button>  */}
            <button onClick={onAddHandler} type="submit" className="btnadd">ADD</button>
          </form>
        </div>
        <div className="col-4">

        </div>
      </div>

    </div>
  </div>)
}
export default AddExpense;