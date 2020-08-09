import React,{Component} from 'react';

class App extends Component{
    state = {h:0,m:0,s:0,seconds:0,timer:false,interval:0,stopon:false,starton:true,submiton:true};
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
        const secs = Number(this.state.h*60*60)+Number(this.state.m*60)+Number(this.state.s);
        this.convertTime(secs);
        this.setState({})
        
        //this.setState({time:t});
      //  this.setState({timer:false});
      //  console.log('start timer',this.state.timer);
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
        //console.log('change timer',this.state.timer);
        this.startTimer();
    }
    handelChange=(e,type)=>{
        e.persist();  //wont clear the object when we close the app
       // console.log('handel change',e,type);
        if(type=='hours'){
            const secs = Number(e.target.value*60*60)+Number(this.state.m*60)+Number(this.state.s);    
            this.setState({h:e.target.value,seconds:secs});
        } //
        if(type=='mins'){
            const secs = Number(this.state.h*60*60)+Number(e.target.value*60)+Number(this.state.s);    
            this.setState({m:e.target.value,seconds:secs});
        }
        if(type=='secs'){
            const secs = Number(this.state.h*60*60)+Number(this.state.m*60)+Number(e.target.value);    
            this.setState({s:e.target.value,seconds:secs});
        }
        
    }
    startset=()=>{
        const secs = Number(this.state.h*60*60)+Number(this.state.m*60)+Number(this.state.s);
        this.setState({starton:true,seconds:secs,stopon:false});
    }
    resetTimer=()=>{
        this.setState({h:0,m:0,s:0,seconds:0,timer:true,interval:0,stopon:false,starton:true,submiton:true});
    }

    render(){
        //flex boxes
        const stop = this.state.stopon?(
            <div>
                <button onClick={this.stopTimer}>Stop</button>
            </div>):null
        const start = this.state.starton?(
            <div>
                <button onClick={this.changeTimer}>Start</button>
            </div>
        ):null;
        const reset = (
            <div>
                <button onClick={this.resetTimer}>Reset</button>
            </div>
        );
        return(
            <div>
                <div>
                    <h3>Countdown Timer</h3>
                </div>
                <div className="timelabel">
                   <label htmlFor="hour">Hour</label>
                    
                    <label htmlFor="minute" className="labelmin">Minute</label>
                    <label htmlFor="second">Second</label>
                </div>
                <div className="time">
                    
                    <input type="number" onChange={e=>this.handelChange(e,'hours')} min="0" value={this.state.h} id="hour" />
                    <h4>:</h4>
                    <input type="number" onChange={e=>this.handelChange(e,'mins')} min="0" max="60" value={this.state.m} id="minute" />
                    <h4>:</h4>
                    <input type="number" onChange={e=>this.handelChange(e,'secs')} min="0" max="60" value={this.state.s} id="second" />
                </div>
                <br></br>
                <div className="button">
                    {start}
                    {stop}
                    {reset}          
                </div>
                
                
            </div>
        )
    }
}
export default App;