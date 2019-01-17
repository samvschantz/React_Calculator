import React, { Component } from "react";

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = { display: 0 };
    this.addNumsToDisplay = this.addNumsToDisplay.bind(this);
    this.addDecimalToDisplay = this.addDecimalToDisplay.bind(this);
  }

  addNumsToDisplay(target) {
    let displayThis =
      this.state.display === 0
        ? target
        : this.state.display + target.toString();
    this.setState({ display: displayThis });
  }

  addDecimalToDisplay(target) {
    console.log(this.state.display.indexOf("."));
    let displayThis =
      this.state.display.indexOf(".") === -1
        ? target
        : this.state.display + target.toString();
    this.setState({ display: displayThis });
  }

  render() {
    return (
      <CalculatorPresenter
        addNumsToDisplay={this.addNumsToDisplay}
        addDecimalToDisplay={this.addDecimalToDisplay}
        display={this.state.display}
      />
    );
  }
}

const CalculatorPresenter = props => {
  const lessThanTenArr = [7, 8, 9, 4, 5, 6, 1, 2, 3];

  const inputNums = lessThanTenArr.map(num => (
    <button key={num} onClick={() => props.addNumsToDisplay(num)}>
      {num}
    </button>
  ));

  const bottomRow = (
    <div className="bottomRow">
      <button onClick={() => props.addNumsToDisplay(0)}>0</button>
      <button onClick={() => props.addDecimalToDisplay(".")}>.</button>
    </div>
  );

  const display = <div className="display">{props.display}</div>;

  return (
    <div className="calcBody">
      {display}
      <div class="table">
        <div class="inputNums">{inputNums}</div>
        {bottomRow}
      </div>
    </div>
  );
};
