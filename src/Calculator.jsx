import React, { Component } from "react";

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = { display: 0 };
    this.addNumsToDisplay = this.addNumsToDisplay.bind(this);
    this.addDecimalToDisplay = this.addDecimalToDisplay.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.backspace = this.backspace.bind(this);
  }

  addNumsToDisplay(target) {
    let displayThis =
      this.state.display === 0
        ? target
        : this.state.display + target.toString();
    this.setState({ display: displayThis });
  }

  addDecimalToDisplay(target) {
    let displayThis = this.state.display + ".";
    if (this.state.display !== 0) {
      if (this.state.display.toString().length === 1) {
        displayThis = this.state.display + ".";
      } else {
        displayThis =
          this.state.display.indexOf(".") === -1
            ? this.state.display + target.toString()
            : this.state.display;
      }
    }
    this.setState({ display: displayThis });
  }

  backspace() {
    let currDisplay = this.state.display;
    let newDisplay = "";
    let displayString = this.state.display.toString();
    let lastPosition = displayString[displayString.length - 1];
    if (displayString !== "0" && lastPosition === " ") {
      newDisplay = displayString.slice(0, displayString.length - 3);
    } else if (displayString !== "0") {
      newDisplay = displayString.slice(0, displayString.length - 1);
    }
    console.log("or passed condish");
    this.setState({ display: newDisplay });
  }

  clearDisplay() {
    this.setState({ display: 0 });
  }

  render() {
    return (
      <CalculatorPresenter
        addNumsToDisplay={this.addNumsToDisplay}
        addDecimalToDisplay={this.addDecimalToDisplay}
        backspace={this.backspace}
        clearDisplay={this.clearDisplay}
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

  const topRow = (
    <div className="topRow">
      <button onClick={() => props.clearDisplay()}>Clear</button>;
      <button onClick={() => props.backspace()}>🠘</button>;
      <button onClick={() => props.addNumsToDisplay(" ÷ ")}>÷</button>;
      <button onClick={() => props.addNumsToDisplay(" × ")}>×</button>;
      <button onClick={() => props.addNumsToDisplay(" - ")}>-</button>;
    </div>
  );
  const bottomRow = (
    <div className="bottomRow">
      <button onClick={() => props.addNumsToDisplay(0)}>0</button>
      <button onClick={() => props.addDecimalToDisplay(".")}>.</button>
    </div>
  );

  const rightColumn = (
    <div className="rightColumn">
      <button onClick={() => props.addNumsToDisplay(" + ")}>+</button>
      <button>=</button>
    </div>
  );

  const display = <div className="display">{props.display}</div>;

  return (
    <div className="calcBody">
      {display}
      <div className="table">
        {topRow}
        <div className="inputNums">{inputNums}</div>
        {bottomRow}
      </div>
      {rightColumn}
    </div>
  );
};
