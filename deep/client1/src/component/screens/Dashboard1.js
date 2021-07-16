import React, { Component } from 'react'
import axioInstance from '../rootApi'
import '../../style/dashboard.css'
import { Redirect } from 'react-router-dom'
import { Link, useHistory } from 'react-router-dom'

export class Dashboard1 extends Component {
  
     constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
           students: []
        }
     } 
     
 componentDidMount(){
    let car = [];
  axioInstance.get("/product").then(
    (response) => {
      debugger;
      
 
    
      this.setState({students:response.data.result})
     
     // console.log(this.state.students,'cbcbcbcb');
    },
    (error) => {
      debugger;
      // error.response.status;
    }
  );
}
 renderTableData(){
let data=this.state.students

return data.map((element)=>{
console.log(element,'njana');
return(
    <tr >
    <td>{element.name}</td>
    <td>{element.price}</td>
    <td>Edit</td>
    <td>Delete</td>
 </tr> 
)

})
  
}
addProduct(){
  return <Redirect to ="/Product"> </Redirect>

}
   
latestProductData(){
    let data=this.state.students
    var i=0;
    return data.map((element)=>{
        i++
        if(i<5){
            console.log(element,'njana');
    return(
        <div className='mycard'>
         <div className="card authcard" style={{float:"left",margin:10}}>
                  {element.name}
                  {element.price}
            </div>
        </div>
        
      )
        }
    
    
    })
      
    }   
   
    render() {
   
        return (
               <div >
                        <h1 id='title'>React Dynamic Table</h1>  
                  <div><button onClick={this.addProduct} class="btn waves-effect waves-light #f44336 red"  >Add product

</button></div>
                 <div>
                   <div style={{width:"150px",marginLeft:"100px"}}>  <input type="text" className="input" placeholder="search item"/></div>
               <div className="select" style={{float:"right",marginRight:"500px"}}>
                
               <select style={{display:"block",marginRight:"300px"}} >
                <option value="" disabled selected>select category</option>
               <option value="1">fruits</option>
               <option value="2">Option 2</option>
             <option value="3">Option 3</option>
             <option value="4">Option 4</option>
             
                  </select>
               </div> </div>
        
              
               
               <table id='students'>
               <tbody>
                   <tr><th> Product name</th><th>Price</th><th> Edit</th><th> Delete</th></tr>

              {this.renderTableData()}  
                  </tbody>
               </table>

               <table>
                   <tbody>
                       <tr>
                       <td> {this.latestProductData()}</td>
                       </tr>
                
                      
                   </tbody>
               </table>
            </div>
         )
    }
}

export default Dashboard1
