import React, { Component } from 'react';

class Footer extends Component {
    state={
        ulFlag: JSON.parse(localStorage.getItem('ulFlag')) || false,
        
    }
        
    // 展示已完成的todos
    showChecked=()=>{
        this.setState({
            ulFlag:!this.state.ulFlag
        })
    }
    render() {
        let { list,selectLength } = this.props;
        localStorage.setItem('ulFlag',JSON.stringify(this.state.ulFlag));
        return (
                <div className='showBox'>
                    <button  onClick={this.showChecked} className="showbtn">{this.state.ulFlag &&  selectLength !== 0 ? '隐藏已完成': '显示已完成'}</button>
                   {this.state.ulFlag && <ul className='showUl'>
                        {
                            list.map((obj)=>{
                                return (
                                   obj.checked && <li key={obj.id}>{obj.content}</li>
                                    
                                )
                            })
                        }
                          
                          
                           
                    </ul>}
                    
                   
                </div>
        );
    }
}

export default Footer;