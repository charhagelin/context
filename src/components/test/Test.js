import React, { Component } from "react";

class Test extends Component {
  componentDidMount() {
    console.log("component did mount");
  }
  componentWillMount() {
    console.log("component will mount");
  }
  componentDidUpdate() {
    console.log("component did update");
  }
  componentWillUpdate() {
    console.log("component will update");
  }
  componentWillReceiveProps(nextProps, nextState) {
    console.log("component will receive props");
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  render() {
    return <div>I'm a test page</div>;
  }
}

export default Test;
