import React from 'react';
import "./flat.css";


class Hello extends React.Component {
  render () {
    return <div>Hello {this.props.firstName} {this.props.lastName}!</div>;
  }
}

export default Hello;