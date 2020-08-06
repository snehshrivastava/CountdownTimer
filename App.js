import React,{Component} from 'react';

class App extends Component{
    state = {h:0,m:0,s:0,seconds:0,timer:false,interval:0,stopon:false,starton:false,submiton:true};
    convertTime=(secs)=>{
//        console.log('convert time',secs);
        const hours = Math.floor(secs/(60*60));
        const minutes = Math.floor((secs%(60*60))/60);
        const seconds = Math.floor(secs%60);
        this.setState({h:hours,m:minutes,s:seconds});
    }
    componentDidMount=()=>{
        this.convertTime(this.state.seconds);
    }

    startTimer=()=>{
        this.convertTime(this.state.seconds);
        //this.setState({time:t});
      //  this.setState({timer:false});
        console.log('start timer',this.state.timer);
      if(!this.state.timer && !this.state.interval)//for not calling the 
        this.state.interval=setInterval(this.countDown,1000);
    }
    countDown=()=>{
        let s = this.state.seconds-1;
        
        if(s>=0 && !this.state.timer){
            this.convertTime(s);
            this.setState({seconds:s});
        }
    }
    stopTimer=()=>{
        this.setState({timer:true,starton:true,stopon:false});
    }
    userInput=()=>{
        var secs = document.getElementById("secs").value;
        this.convertTime(secs);
        this.setState({seconds:secs,timer:true},()=> this.startTimer());//why after double submit time getting changed
        
    }

    changeTimer=()=>{
        this.setState({timer:false,stopon:true,starton:false,submiton:false});// onchange event
        console.log('change timer',this.state.timer);
        this.startTimer();
    }
    handelChange=(e)=>{
        this.setState({seconds:e.target.value});
    }
    startset=()=>{
        const secs = Number(this.state.h*60*60)+Number(this.state.m*60)+Number(this.state.s);
        this.setState({starton:true,seconds:secs,stopon:false});
    }

    render(){
        const stop = this.state.stopon?(
            <div>
                <button onClick={this.stopTimer}>Stop</button>
            </div>):null
        const start = this.state.starton?(
            <div>
                <button onClick={this.changeTimer}>Start</button>
            </div>
        ):null;
        const submit = this.state.submiton?(
            <div>
                <button type="Submit" onClick={this.startset} >Submit</button>
            </div>
        ):null;
        return(
            <div> 
                <div>
                    <p>Enter Hours</p>
                    <input type="number" onChange={e=>this.setState({h:e.target.value,submiton:true})} min="0"  />
                    <p>Enter Minutes</p>
                    <input type="number" onChange={e=>this.setState({m:e.target.value,submiton:true})} min="0" max="60" />
                    <p>Enter Seconds</p>
                    <input type="number" onChange={e=>this.setState({s:e.target.value,submiton:true})} min="0" max="60" />
                </div>
                <br></br>
                {submit}
                {start}
                {stop}
                <br></br>h:{this.state.h}
                <br></br>m:{this.state.m}
                <br></br>s:{this.state.s}
                <br></br>
                
            </div>
        )
    }
}
export default App;