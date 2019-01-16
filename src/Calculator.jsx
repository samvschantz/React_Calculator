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
  const inputNums = [];
  var num = 0;
  for (var i = 1; i < 10; i++) {
    inputNums.push(<button>{i}</button>);
  }
  console.log(inputNums);

  const display = <div className="display" />;
  return (
    <div className="calcBody">
      {display}
      <table>
        <tbody>{inputNums}</tbody>
      </table>
    </div>
  );
};
