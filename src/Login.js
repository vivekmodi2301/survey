import React,{Component} from 'react';

var firebase = require('firebase');
var config = {
   apiKey: "AIzaSyB7XU3Tm3XQVXENeihBVm2qvB0gTWj8cQQ",
   authDomain: "survey-a9a20.firebaseapp.com",
   databaseURL: "https://survey-a9a20.firebaseio.com",
   projectId: "survey-a9a20",
   storageBucket: "",
   messagingSenderId: "751494710490"
 };
 firebase.initializeApp(config);

class Login extends Component {


    submit(event){
      const username = this.refs.username.value;
      const password = this.refs.password.value;

      const auth = firebase.auth();
      const promise = auth.signInWithEmailAndPassword(username,password);
      promise
      .then(user => {
      console.log(user);
      var siup = document.getElementById('form');
      siup.classList.add('hide');
      var lout = document.getElementById('questions');
      lout.classList.remove('hide');

        this.setState({
          photo:'',
          authBy:'simple',
          username:user.user.email,
          uid:user.user.uid
        })
      })
      .catch(e => {
        alert(e.message);
      });
      this.setState({})
    }
    signup(event){
      const username = this.refs.username.value;
      const password = this.refs.password.value;

      const auth = firebase.auth();
      const promise = auth.createUserWithEmailAndPassword(username,password);

      promise
      .then(user => {
        firebase.database().ref('users/'+user.user.uid).set({
          email:user.user.email
        });
      })
      .catch(e => {
        alert(e.message);
      });
    }
    loginGoogle(event){
      var provider = new firebase.auth.GoogleAuthProvider();
      var promise = firebase.auth().signInWithPopup(provider);


      promise
      .then(result => {

        var siup = document.getElementById('form');
        siup.classList.add('hide');
        var lout = document.getElementById('questions');
        lout.classList.remove('hide');
        console.log(result);
        firebase.database().ref('users/'+result.user.uid).set({
          email:result.user.email,
          name:result.user.displayName,
        });
        this.setState({
          photo:result.user.photoURL,
          authBy:'gmail',
          username:result.user.displayName,
          uid:result.user.uid
        })
      });
      promise
      .catch(e => {
        var err = e.message;
        alert(err);
      });
    }
    loginFacebook(event){
      var provider = new firebase.auth.FacebookAuthProvider();
      var promise = firebase.auth().signInWithPopup(provider);


      promise
      .then(result => {

        var siup = document.getElementById('form');
        siup.classList.add('hide');
        var lout = document.getElementById('questions');
        lout.classList.remove('hide');
        console.log(result);
        firebase.database().ref('users/'+result.user.uid).set({
          email:result.user.email,
          name:result.user.displayName
        });

        this.setState({
          photo:result.user.photoURL,
          authBy:'gmail',
          username:result.user.displayName,
          uid:result.user.uid
        })
      });
      promise
      .catch(e => {
        var err = e.message;
        alert(err);
      });
    }
    selectAns(event){
      var answers = this.state.answers;
      if(event.target.name === 'ans1'){
        answers.ans1 = event.target.value;
      }
      else if(event.target.name === 'ans2'){
        answers.ans2 = event.target.value;
      }
      else if(event.target.name === 'ans3'){
        answers.ans3 = event.target.value;
      }
      this.setState({answers:answers},function(){
        console.log(this.state);
      })

    }
    finalSubmit(){
      firebase.database().ref("questions/"+this.state.uid).set({
        studentName :this.state.username,
        answers:this.state.answers
      });
      var siup = document.getElementById('form');
      siup.classList.add('hide');
      var lout = document.getElementById('questions');
      lout.classList.add('hide');
      var thanks = document.getElementById('thanks');
      thanks.classList.remove('thanks');

    }
  constructor(props){
    super(props);

    this.state = {
      show:'',
      answers:{
        ans1:'',
        ans2:'',
        ans3:''
      },
      username:'',
      photo:'',
      auth:'',
      uid:''
    };
    this.submit =  this.submit.bind(this);
    this.signup = this.signup.bind(this);
    this.loginGoogle = this.loginGoogle.bind(this);
    this.loginFacebook = this.loginFacebook.bind(this);
    this.selectAns = this.selectAns.bind(this);
    this.finalSubmit = this.finalSubmit.bind(this);
  }

  render(){
    var table = {
      marginTop:'50px'
    }
    var tableHeading ={
      textAlign:'center'
    }
    var subTable = {
      marginTop :'5px'
    }
    var space = {
      width:'80%'
    }
    var center = {
      textAlign:'center'
    }
    var leftSpace = {
      marginLeft:'10px'
    }
    return(
      <div>
        <div id="form">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <table style={table} className="table table-bordered table-hover" width="50%">
              <tbody>
                  <tr height="100px">
                    <th style={tableHeading}>Login Form</th>
                  </tr>
                  <tr>
                    <td>
                        <table style={subTable}  className="table table-hover" width="50%">
                          <tbody>
                            <tr height="100px">
                              <th >Username</th>
                              <td><input type="text" ref="username" style={space} className="form-control" /></td>
                            </tr>
                            <tr height="100px">
                              <th >Password</th>
                              <td><input type="password" ref="password" style={space} className="form-control" /></td>
                            </tr>
                            <tr>
                              <th style={center} colSpan="2">
                              <button  style={leftSpace}  className="btn btn-primary" ref="login" onClick={this.submit} >Log-In</button>
                              <button  style={leftSpace} className="btn btn-primary" ref="signup" onClick={this.signup} >Sign-Up</button>
                              <button  style={leftSpace} className="btn btn-primary" ref="loginGoogle" onClick={this.loginGoogle} >Google-Login</button>
                              <button  style={leftSpace} className="btn btn-primary" ref="loginFacebook" onClick={this.loginFacebook} >Facebook-Login</button>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
        <div className="hide" id="questions">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
          <form onSubmit={this.finalSubmit}>
            <table  className="table table-bordered  table-hover">
              <tbody>
                <tr >
                  <th style={tableHeading}>Welcome {this.state.username} <img src={this.state.photo} alt="N/A" height="50px" width="50px" /></th>
                </tr>
                <tr>
                  <td>Who are you?</td>
                </tr>
                <tr>
                  <td>
                    <input type="radio" name="ans1"  onChange={this.selectAns} ref="ans1" value="student" />Student
                    <input type="radio" name="ans1"  onChange={this.selectAns} ref="ans1" value="professional" />Professional
                    <input type="radio" name="ans1"  onChange={this.selectAns} ref="ans1" value="both" />Both
                  </td>
                </tr>
                <tr>
                  <td>Your professional feild?</td>
                </tr>
                <tr>
                  <td>
                    <input type="radio" name="ans2" onChange={this.selectAns} ref="ans2" value="cs" />CS
                    <input type="radio" name="ans2" onChange={this.selectAns} ref="ans2" value="marketing" />Marketing
                    <input type="radio" name="ans2" onChange={this.selectAns} ref="ans2" value="other" />Other
                  </td>
                </tr>
                <tr>
                  <td>Do you use jio sim?</td>
                </tr>
                <tr>
                  <td>
                    <input type="radio" name="ans3" onChange={this.selectAns} ref="ans3" value="yes" />Yes
                    <input type="radio" name="ans3" onChange={this.selectAns} ref="ans3" value="no" />No
                  </td>
                </tr>
                <tr>
                  <td colSpan="2"><input type="submit" className="btn btn-primary" value="Submit" /></td>
                </tr>
              </tbody>
            </table>
            </form>
          </div>
        </div>
        <div id="thanks" className="hide">
          this is last div
        </div>
      </div>
    );
  }
}

export default Login
