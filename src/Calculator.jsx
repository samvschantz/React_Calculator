import React, { Component } from "react";

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 0,
      equationHistory: [],
      answerInDisplay: false
    };
    this.addToDisplay = this.addToDisplay.bind(this);
    this.addDecimalToDisplay = this.addDecimalToDisplay.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.backspace = this.backspace.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
    this.equals = this.equals.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
    document.addEventListener("keyup", this.handleKeyup);
  }

  addToDisplay(target) {
    let displayThis = 0;
    let operatorArray = [" + ", " - ", " ÷ ", " × ", "."];
    let displayString = this.state.display.toString();
    let lastInDisplay = displayString[displayString.length - 1];
    //If 0 is in display do not add more numbers
    //If 0 is in the display only add numbers
    if (
      (this.state.display.toString() === "0" && target.toString() === "0") ||
      (this.state.display.toString() === "0" && isNaN(target) === true)
    ) {
      displayThis = 0;
    } else if (this.state.answerInDisplay !== true) {
      //If answer is not in display check if we are putting first num in display or adding to display
      displayThis =
        this.state.display === 0 || this.state.display === "0"
          ? target
          : this.state.display + target.toString();
    } else if (this.state.answerInDisplay === true) {
      //Since answer is in display we will only add operators
      //If target is a number we will start from scratch with this entry
      if (operatorArray.includes(target)) {
        displayThis = this.state.display + target.toString();
        this.setState({ answerInDisplay: false });
      } else {
        displayThis = target;
        this.setState({ answerInDisplay: false });
      }
    }
    if (lastInDisplay === " " && operatorArray.includes(target)) {
      displayThis = displayString;
    }
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
    let newDisplay = "0";
    let displayString = this.state.display.toString();
    let lastPosition = displayString[displayString.length - 1];
    if (displayString !== "0" && lastPosition === " ") {
      newDisplay = displayString.slice(0, displayString.length - 3);
    } else if (displayString !== "0" && displayString.length > 1) {
      newDisplay = displayString.slice(0, displayString.length - 1);
    }
    this.setState({ display: newDisplay });
  }

  clearDisplay() {
    this.setState({ display: 0 });
  }

  handleKeydown(key) {
    let num = key.key;
    let operatorArray = ["+", "-", "=", "*", "/", "x", "X", "Enter"];
    let timesOperatorsArray = ["*", "x", "X"];
    if (operatorArray.includes(num)) {
      if (operatorArray.indexOf(num) < 2) {
        this.addToDisplay(" " + num + " ");
      } else if (timesOperatorsArray.includes(num)) {
        if (this.state.display.indexOf("×") > -1) {
          this.equals();
        }
        this.addToDisplay(" × ");
      } else if (num === "/") {
        if (this.state.display.indexOf("÷") > -1) {
          this.equals();
        }
        this.addToDisplay(" ÷ ");
      } else if (num === "=" || num === "Enter") {
        this.equals();
      }
    } else if (num === "Backspace" || num === "Delete") {
      this.backspace();
    } else if (!isNaN(num)) {
      //adds actual numbers!
      this.addToDisplay(num);
    }
    this.setState({ buttonPress: num });
  }

  handleKeyup(key) {
    this.setState({
      buttonPress: ""
    });
  }

  equals() {
    let equation = this.state.display;
    let equationString = this.state.display.replace(/\s+/g, "");
    equationString = equationString.replace("÷", "/").replace("×", "*");
    let operatorArray = ["+", "-", "=", "*", "/", "x", "X", "Enter"];
    let timesOperatorsArray = ["*", "x", "X"];
    let total = eval(equationString).toString();
    let historyItem = this.state.display.toString() + " = " + total;
    this.setState({
      display: total,
      equationHistory: [historyItem, ...this.state.equationHistory],
      answerInDisplay: true
    });
  }

  render() {
    return (
      <CalculatorPresenter
        addToDisplay={this.addToDisplay}
        addDecimalToDisplay={this.addDecimalToDisplay}
        backspace={this.backspace}
        clearDisplay={this.clearDisplay}
        equals={this.equals}
        display={this.state.display}
        buttonPress={this.state.buttonPress}
        equationHistory={this.state.equationHistory}
      />
    );
  }
}

const CalculatorPresenter = props => {
  const lessThanTenArr = [7, 8, 9, 4, 5, 6, 1, 2, 3];

  const inputNums = lessThanTenArr.map(function(num) {
    if (num.toString() === props.buttonPress) {
      return (
        <button
          key={num}
          className={"pressed"}
          onClick={() => props.addToDisplay(num)}
        >
          {num}
        </button>
      );
    } else {
      return (
        <button key={num} onClick={() => props.addToDisplay(num)}>
          {num}
        </button>
      );
    }
  });

  const topRow = (
    <div className="topRow">
      <button onClick={() => props.clearDisplay()}>Clear</button>
      <button onClick={() => props.backspace()}>🠘</button>
      <button onClick={() => props.addToDisplay(" ÷ ")}>÷</button>
      <button onClick={() => props.addToDisplay(" × ")}>×</button>
      <button onClick={() => props.addToDisplay(" - ")}>-</button>
    </div>
  );
  const bottomRow = (
    <div className="bottomRow">
      <button onClick={() => props.addToDisplay(0)}>0</button>
      <button onClick={() => props.addDecimalToDisplay(".")}>.</button>
    </div>
  );

  const rightColumn = (
    <div className="rightColumn">
      <button onClick={() => props.addToDisplay(" + ")}>+</button>
      <button onClick={() => props.equals()}>=</button>
    </div>
  );

  const display = <div className="display">{props.display}</div>;

  let equationHistory = <div />;

  if (props.equationHistory.length > 0) {
    equationHistory = props.equationHistory.map((equation, i) => (
      <div key={i} className="equationHistory">
        {equation}
      </div>
    ));
  }

  return (
    <div>
      <div className="equationHistoryBox">{equationHistory}</div>
      <div className="calcBody">
        {display}
        <div className="table">
          {topRow}
          <div className="inputNums">{inputNums}</div>
          {bottomRow}
        </div>
        {rightColumn}
      </div>
    </div>
  );
};
