import React,{Component} from 'react';

class App extends Component{
    state = {time:{},seconds:3600,timer:false,interval:0};
    convertTime=(secs)=>{
        const hours = Math.floor(secs/(60*60));
        const minutes = Math.floor((secs%(60*60))/60);
        const seconds = Math.floor(secs%60);
        const obj = {
            "h":hours,
            "m":minutes,
            "s":seconds
        };
        return obj;
    }
    componentDidMount=()=>{
        const timeleft = this.convertTime(this.state.seconds);
        this.setState({time:timeleft});
    }

    startTimer=()=>{
        //const t=this.convertTime(this.state.seconds);
      //  this.setState({time:t});
      //this.setState({timer:0})
      this.setState({timer:false});
      if(!this.state.timer)
        this.state.interval=setInterval(this.countDown,1000);
    }
    countDown=()=>{
        let s = this.state.seconds-1;
        
        if(s>=0 && !this.state.timer)
        this.setState({time:this.convertTime(s),seconds:s});
    }
    stopTimer=()=>{
        this.setState({timer:true});
    }

    render(){
     //   const {hour,minute,second} = this.state;
     //console.log('react',React);
        console.log('seconds',this.state.seconds);
        console.log('this.state.timer',this.state.timer);
        return(
            <div> 
                <button onClick={this.startTimer}>Start</button>
                <button onClick={this.stopTimer}>Stop</button>
                <br></br>h:{this.state.time.h}
                <br></br>m:{this.state.time.m}
                <br></br>s:{this.state.time.s}
                <br></br>
                
            </div>
        )
    }
}
export default App;