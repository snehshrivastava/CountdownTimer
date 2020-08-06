import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'; //to use default app exported form app.js
import './index.css';

ReactDOM.render(<App></App>,document.getElementById('root'));
/*
new Promise((resolve,reject)=>{
    return reject(new Error('No Beers'));

    setTimeout(()=>{
        console.log('Bears');
        resolve();
    },2000);
})
.then(()=>{
    console.log('Beats');
    console.log('Battlestart Galactica');
})
.catch(error=> console.log('error',error));*/