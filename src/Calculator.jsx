import React, { Component } from "react";

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = { display: 0 };
  }
  render() {
    return <CalculatorPresenter />;
  }
}

const CalculatorPresenter = props => {
  return <p>Hello</p>;
};
