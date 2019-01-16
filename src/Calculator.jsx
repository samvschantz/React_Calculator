import React, { Component } from "react";

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = { display: 0 };
    this.addNumsToDisplay = this.addNumsToDisplay.bind(this);
  }

  addNumsToDisplay(target) {
    let displayThis =
      this.state.display === 0
        ? target
        : this.state.display + target.toString();
    this.setState({ display: displayThis });
  }

  render() {
    return (
      <CalculatorPresenter
        addNumsToDisplay={this.addNumsToDisplay}
        display={this.state.display}
      />
    );
  }
}

const CalculatorPresenter = props => {
  const lessThanTenArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const inputNums = lessThanTenArr.map(num => (
    <button key={num} onClick={() => props.addNumsToDisplay(num)}>
      {num}
    </button>
  ));

  const display = <div className="display">{props.display}</div>;

  return (
    <div className="calcBody">
      {display}
      <table>
        <tbody>{inputNums}</tbody>
      </table>
    </div>
  );
};
