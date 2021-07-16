import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../../style/product.css'
import axioInstance from '../rootApi'

function Product() {
   
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [category, setCategory] = useState('')
    const accessToken=localStorage.getItem('token')
    function addProduct(){
        console.log(name,price,quantity,'name');
        alert(accessToken)
        axioInstance
        .post("/addproduct", {
          name: name,
          price: price,
          quantity:quantity,
          category:category,
         
        })
        .then(
          (response) => {
            debugger;
            
            console.log(response,'hhhh');
            
       alert(accessToken)
          },
          (error) => {
            debugger;

            if (error.response.status == 404) alert("User not exist");
          }
        );
        
     }

    return (
        <div className='mycard'>
              <div className="card authcard">
                  <h3> Add product</h3>
              <input type="text" placeholder='name'  value={name} 
                    onChange={(e) => { setName(e.target.value) }} ></input>
              <input type="text" placeholder='price' value={price}
                    onChange={(e) => { setPrice(e.target.value) }} ></input>
              <input type="text" placeholder='quantity'  value={quantity}
                    onChange={(e) => { setQuantity(e.target.value) }}></input>
             
              <select style={{display:"block"}} value={category}
                    onChange={(e) => { setCategory(e.target.value) }}  >
                <option value="" disabled selected>select category</option>
               <option value="1">fruits</option>
               <option value="2">Option 2</option>
             <option value="3">Option 3</option>
             <option value="4">Option 4</option>
             
                  </select>
                  <button class="btn waves-effect waves-light #f44336 red" onClick={addProduct}>Add
               </button>
          
              </div>
        </div>

      
    )
}

export default Product
