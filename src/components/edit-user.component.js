import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this);
    this.onChangeNews = this.onChangeNews.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhoto = this.onChangePhoto.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      gender: '',
      dob: new Date(),
      news:'',
      email:'',
      photo:'',
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          gender: response.data.gender,
          dob: new Date(response.data.dob),
          news: response.data.news,
          email: response.data.email,
          photo: response.data.photo
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    })
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    })
  }

  onChangeDob(date) {
    this.setState({
      dob: date
    })
  }

  onChangeNews(e) {
    this.setState({
      news: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePhoto(e) {
    this.setState({
      photo: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      gender: this.state.gender,
      dob: this.state.dob,
      news: this.state.news,
      email: this.state.email,
      photo: this.state.photo,
    }

    console.log(user);

    axios.put('http://localhost:5000/users/' + this.props.match.params.id, user)
      .then(res => console.log(res.data));

    window.location = '/users';
  }

  render() {
    return (
    <div>
      <h3>Edit User Log</h3>
      <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
            <label>gender: </label>
            <select ref="genderInput"
              required
              className="form-control"
              value={this.state.gender}
              onChange={this.onChangeGender}>              
              <option key="male" value="male">male</option>
              <option key="female" value="female">female</option>
            </select>
            <label>Date of Birth: </label>
            <div>
              <DatePicker
                selected={this.state.dob}
                onChange={this.onChangeDob}
              />
          </div>
            <label>News: </label>
            <select ref="newsInput"
            required
            className="form-control"
            value={this.state.news}
            onChange={this.onChangeNews}>              
              <option key="true" value="true">true</option>
              <option key="false" value="false">false</option>
            </select>
            <label>Email: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
            <label>photo: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.photo}
                onChange={this.onChangePhoto}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
      </form>
    </div>
    )
  }
}