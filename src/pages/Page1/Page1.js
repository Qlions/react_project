import React, {Component} from "react"

import {tag} from "../../redux/actions/page1"
import {connect} from "react-redux"
import './Page1.css';
import img from './images/add_meal8.png'
 class Page1 extends Component {
    constructor(props){
        super(props)
        this.state = {
            num: 0
        }
    }
    render(){
        return (
            
            <div className='page-box'>this is Page1~
                 <img src={img}/>
                 <p onClick={() => this.props.tag()}>{this.props.page1.num}1</p>
            </div>
           
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        page1: state.page1
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        tag: () => {
            dispatch(tag())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Page1)