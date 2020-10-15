import React, { useState, useEffect } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'

const server_url = 'http://localhost:9000/api';

function App() {
  const [quotation, setQuotation] = useState([]);
  const [quotationInfo, setQuotationInfo] = useState('');
  const [showQuotation, setShowQuotation] = useState(false);

  useEffect(() => {
    retrieveQuotation()
  }, [])

  function retrieveQuotation() {
    fetch(server_url)
      .then(res => res.text())
      .then(res => {
        setQuotation(JSON.parse(res))
      })
  }

  async function submitForm(){
    const url = server_url+'/submit-quotation';

    try {
      axios({
        url: url,
        method: 'POST',
        data: { quotation_info: quotationInfo },
        headers: { 'Content-Type': 'Application/json' }
      })
      .then(() => {
        setQuotationInfo('')
        alert('Quotation info has been saved.')
        retrieveQuotation()
      })
      .catch(() => {
        console.log('Internal server error')
      })
    } catch (err) {
      console.error(err);
    }
  }

  function renderQuotation(){
    if (quotation && quotation.length){
      return quotation.map((data, i)=>(
        <tr key={i}>
          <td>{data._id}</td>
          <td>{data.quotation_info}</td>
          <td>{data.quotation_valid ? 'true' : 'false'}</td>
        </tr>
      ))
    }
  }

  return (
    <div style={{ padding: 10 }}>
      { !showQuotation ? (
        <div>
          <p>Quotation Info: {quotationInfo}</p>

          <input
            type="text"
            name="quotation_info"
            placeholder="Enter quotation info"
            value={quotationInfo}
            onChange={e => setQuotationInfo(e.target.value)} />
          <input
            type="submit"
            name="submit"
            disabled={quotationInfo.length ? false : true}
            onClick={() => submitForm()} />

          <button onClick={() => setShowQuotation(true)}>Show all quotation</button>
        </div>
      ) : (
        <div>
          <button onClick={() => setShowQuotation(false)}>Return</button>
          <h5 style={{paddingTop: 15}}>All Quotation</h5>
          <Table responsive="md" bordered={true}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Quotation Info</th>
                <th>Quotation Valid</th>
              </tr>
            </thead>
            <tbody>
              {renderQuotation()}
            </tbody>
          </Table>
        </div>
      ) }
    </div>
  );
}

export default App;
