import './App.css';
import React, { Component} from 'react';
import AppRouter from './components/Routers/Routers';
import alanBtn from '@alan-ai/alan-sdk-web';
//import App1 from './components/alan/voice';
import Login from './components/Auth/login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isAuthenticated:!!sessionStorage.getItem("username")||false,
      username:sessionStorage.getItem("username")||"",
      error:''
    }
    this.handleLogin=this.handleLogin.bind(this);
    this.handleLogout=this.handleLogout.bind(this,false);
  }
  handleLogout(username,isAuthenticated,error){
   
    this.setState({
      username,
      isAuthenticated,
      error
      
    })
    console.log("log out");
    sessionStorage.removeItem("username");

  }

  handleLogin(username,isAuthenticated,error){
    console.log(username,isAuthenticated,error)
    this.setState({
      isAuthenticated,
      username,
      error
    })
    if(isAuthenticated)
      sessionStorage.setItem("username",username);
  }


  componentDidUpdate() {
    if(this.state.isAuthenticated===true){
      console.log("this is done ")
    this.alanBtnInstance = alanBtn({ 
      key: 'b1460b1760481aff85ece0b9df063d582e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand:({command})=>{
        if(command==='test'){
          console.log("this is cmg")
          Axios
          .get(`http://localhost:4000/monthlyExpenseLimit`).then(response=>{
            console.log("your MEL is: "+response.data[0].left)
            alert("your MEL is: "+response.data[0].left)
          })
        }   
      },
    });
    }
  }
  componentWillUnmount() {
    if(this.state.isAuthenticated===false){
    console.log('Component WILL UNMOUNT!')
    this.alanBtnInstance = alanBtn({ 
      key: 'b1460b1760481aff85ece0b9df063d582e956eca572e1d8b807a3e2338fdd0dc/stage'
  });
 }
}
  
  render(){
    const {isAuthenticated,username,error}=this.state
    console.log(isAuthenticated,"hello");
    return (
      <Router>
        <Switch>
          {!isAuthenticated ?
              <Route path="/" render ={ (props) => <Login  {...props} error={error} handleLogin = {this.handleLogin}/>}></Route> 
                :
              <Route path="/" render = {(props) => <AppRouter  {...props} username={username} handleLogout={this.handleLogout}/>}></Route>
        
          }
          <Route path="*" render={()=> <h1>404 page not found</h1>}></Route>
        </Switch>
    </Router>
    )
  }
  
}





export default App;
