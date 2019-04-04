import React, {Component} from 'react';

const text = 'Suddenly quite near him there was a rifle shot. He heard the crack and smack and whistling ricochet among the rocks behind him. He dropped his torch and began feebly to trot.';
export default class TypeApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startString: text,
            typedValue : '',
            typeSpeed: 0,
            doesCharMatch: true
        }
        this.startTime = null;
    }

        typeHandler = (e) => {
            if(e.target.value.length ===1) {
                this.startTime = new Date();
            }
            const currentTypedChar = e.target.value.substr(-1);
            const currentLeadString = this.state.startString;

           
            if(currentTypedChar == currentLeadString.charAt(0)) {
                const diffInSec = ( new Date() - this.startTime)/1000;
                const speed = diffInSec === 0 ? 0 : (text.length - this.state.startString.length) / diffInSec;
    
                this.setState({doesCharMatch: true, typedValue: e.target.value, startString: currentLeadString.substr(1), typeSpeed: speed});
            }
            else {
                this.setState({doesCharMatch: false});
            }

        }
    

    keydownHandler = (event) => {
        if (event.keyCode == 13 || event.keyCode == 8 || this.state.startString.length === 0) {
            event.preventDefault();
        }
    }
    resetHandler = () => {
        this.setState({startString: text, typedValue: '', typeSpeed: 0});
        this.startTime = null;
    }
    render() {
        const textAreaStyle = this.state.doesCharMatch ? 'type-area' : 'type-area-error';
        return(<div>
            Test your Typing Speed!!!
            <div className='practice-text'>
                {this.state.startString}
            </div>

            <textarea className={textAreaStyle} onKeyDown = {this.keydownHandler} placeholder='start Typing..' value ={this.state.typedValue} onChange={this.typeHandler}/>

            <div>
                Speed: {this.state.typeSpeed} charactes per second
            </div>
            <button onClick={this.resetHandler}> Start Again</button>
        </div>)
    }
}