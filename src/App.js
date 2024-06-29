import './App.css';
import { get } from 'aws-amplify/api';
import { useState } from 'react'
import { Amplify } from "aws-amplify";

import WebCam from './components/MyWebCam';
import Photo_capture_from_scratch from  './components/MyWebCam2';
import UploadPicture from './components/UploadPic'

const myAPI = "apijun2724"//"https://c7hgw5za5e.execute-api.us-west-2.amazonaws.com/dev"//"June07AmplifyLambda2"
const path = "/customers"; 



const awsmobile = {
    "aws_project_region": "us-west-2",
    "aws_cloud_logic_custom": [
        {
            "name": "apijun2724",
            "endpoint": "https://g9qdesewp6.execute-api.us-west-2.amazonaws.com/dev",
            "region": "us-west-2"
        }
    ]
};

Amplify.configure(awsmobile);

const App = () => {
  const [input, setInput] = useState("")
  const [customers, setCustomers] = useState([])

  async function getCustomer(e) {
    let customerId = e.input
    const restOperation = get({apiName: myAPI, path: path + "/" + customerId})
    const { body } = await restOperation.response;
    const response = await body.json();
    console.log(response)
    let newCustomers = [...customers]
    newCustomers.push(response)
    setCustomers(newCustomers)
  }
  
  

  return (
    
    <div className="App">

   
      <h2> 2nd WebCam: Left here Jun 28, 24</h2>    
      <Photo_capture_from_scratch />
      
      <h2> 3. Upload  </h2>
      <h2>  <UploadPicture/>  </h2>
      <div>
          <input placeholder="customer id" type="text" value={input} onChange={(e) => setInput(e.target.value)}/>      
      </div>
      <br/>
      <button onClick={() => getCustomer({input})}>Get Customer From Backend</button>

      <h2 style={{visibility: customers.length > 0 ? 'visible' : 'hidden' }}>Response</h2>
      {
       customers.map((thisCustomer, index) => {
         return (
        <div key={thisCustomer.customerId}>
          <span><b>CustomerId:</b> {thisCustomer.customerId} - <b>CustomerName</b>: {thisCustomer.customerName}</span>
        </div>)
       })
      }
      
      <h2>1st WebCam: Not working!</h2>
       <WebCam />   
      
    </div>
  )
}

export default App;


