import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
  <tr>
    <td>{props.user.username}</td>
    <td>{props.user.gender}</td>
    <td>{props.user.dob.substring(0,10)}</td>
    <td>{props.user.news}</td>
    <td>{props.user.email}</td>
    <td><img src={props.user.photo} alt="pictur not found"/></td>
    <td>
      <Link className="btn btn-primary" to={"/editUser/"+props.user._id}>edit</Link><a href="#" className="btn ml-2 btn-danger" onClick={() => { props.deleteUser(props.user._id) }}>delete</a>
    </td>
  </tr>
)

export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this)

    this.state = {users: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteUser(id) {
    axios.delete('http://localhost:5000/users/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      users: this.state.users.filter(el => el._id !== id)
    })
  }

  userList() {
    return this.state.users.map(currentuser => {
      return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Users</h3>
        <table className="table table-stripped">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>News</th>
              <th>Email</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.userList() }
          </tbody>
        </table>
      </div>
    )
  }
}