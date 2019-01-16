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
  const lessThanTenArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const inputNums = lessThanTenArr.map((num, i) => (
    <tr>
      <td>
        <input key={i} type="number" value={num} />
      </td>
    </tr>
  ));

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
