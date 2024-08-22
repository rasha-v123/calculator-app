import React, { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

const getStyleName = (btn) => {
  const className = {
    "=": "equals",
    x: "opt",
    "-": "opt",
    "+": "opt",
    "/": "opt",
  };
  return className[btn];
};

const Button = ({ value }) => {
  const { calc, setCalc } = useContext(CalcContext);

  // user clicks comma
  const commaClick = () => {
    setCalc((prevCalc) => ({
      ...prevCalc,
      num: !prevCalc.num.toString().includes(".")
        ? prevCalc.num + value
        : prevCalc.num,
    }));
  };

  const resetClick = () => {
    setCalc(() => ({
      sign: "",
      num: 0,
      res: 0,
    }));
  };

  // user clicks number
  const handleClickButton = () => {
    const numberString = value.toString();
    let numberValue;
    if (numberString === "0" && calc.num === 0) {
      numberValue = "0";
    } else {
      numberValue = Number(calc.num + numberString);
    }

    setCalc((prevCalc) => ({
      ...prevCalc,
      num: numberValue,
    }));
  };

  // user click operations

  const signClick = () => {
    setCalc((prevCalc) => ({
      ...prevCalc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    }));
  };

  // user clicks equals

  const equalsClick = () => {
    if (calc.res && calc.num) {
      const math = (a, b, sign) => {
        const result = {
          "+": (a, b) => a + b,
          "-": (a, b) => a - b,
          x: (a, b) => a * b,
          "/": (a, b) => a / b,
        };
        return result[sign](a, b);
      };

      setCalc((prevCalc) => ({
        ...prevCalc,
        res: math(calc.res, calc.num, calc.sign),
        num: 0,
      }));
    }
  };

  const handleBtnClick = () => {
    const results = {
      ".": commaClick,
      C: resetClick,
      "/": signClick,
      x: signClick,
      "-": signClick,
      "+": signClick,
      "=": equalsClick,
    };

    if (results[value]) {
      return results[value]();
    } else {
      return handleClickButton();
    }
  };

  return (
    <div onClick={handleBtnClick} className={`${getStyleName(value)} button`}>
      {value}
    </div>
  );
};

export default Button;
