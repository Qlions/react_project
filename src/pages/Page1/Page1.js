import React, {Component} from "react"

import './Page1.css';
import img from './images/add_meal8.png'
export default class Page1 extends Component {
    render(){
        return (
            
            <div className='page-box'>this is Page1~
                 <img src={img}/>

            </div>
           
        )
    }
}