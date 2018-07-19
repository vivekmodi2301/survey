import React,{Component} from 'react';

class LoginForm extends Component {
  render(){

      var table = {
        margin:'5px'
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
        <table style={table}  className="table table-hover" width="50%">
          <tr height="100px">
            <th >Username</th>
            <td><input type="text" style={space} className="form-control" /></td>
          </tr>
          <tr height="100px">
            <th >Password</th>
            <td><input type="password" style={space} className="form-control" /></td>
          </tr>
          <tr>
            <th style={center} colspan="2">
            <input type="submit" className="btn btn-primary" />
            <input type="submit" style={leftSpace} value="Login with Google" className="btn btn-primary" />
            </th>
          </tr>
        </table>
      </div>
    );
  }
}

export default LoginForm;
