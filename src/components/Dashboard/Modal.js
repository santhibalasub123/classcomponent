import './Dashboard.css';

function Modal(props) {
  return (
    <div className='custom-modal'>
      <p>{props.text}</p>
      <form>
                      <div className="form-group">
                          <label>Expense Name</label>
                          <input type="text"  onChange={props.onUpdate} value={props.getForm.expenseName} name="expenseName" className="form-control" id="expenseName"  placeholder="Enter expenseName"/>
                          <div className="text-danger">{props.getValidation.expenseName}</div>
                        </div>
                        <div className="form-group">
                          <label>Amount</label>
                          <input type="text"  onChange={props.onUpdate} value={props.getForm.amount} name="amount" className="form-control" id="amount"  placeholder="Enter amount"/>
                          <div className="text-danger">{props.getValidation.amount}</div>
                        </div>
                        <div className="form-group">
                          <label>Paid By</label>
                          <input type="text"  onChange={props.onUpdate} value={props.getForm.paidBy} name="paidBy" className="form-control" id="paidBy"  placeholder="Enter paidBy"/>
                          <div className="text-danger">{props.getValidation.paidBy}</div>
                        </div>
                        <div className="form-group">
                          <label>Date</label>
                          <input type="date"  onChange={props.onUpdate} value={props.getForm.date} name="date" className="form-control" id="date"  placeholder="Enter date"/>
                          <div className="text-danger">{props.getValidation.date}</div>
                        </div>
                        <button onClick={props.onClose} type="submit" className="btn btn-success">Cancel</button>
                      <button onClick={props.onSubmit} type="submit" className="btn btn-success">{props.text}</button>
                    </form>
    </div>
  );
}

export default Modal;
