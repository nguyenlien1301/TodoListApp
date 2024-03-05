import React, { useState, useRef } from "react";
import Button from "../Button";

const Form = ({
  handleSubmit,
  btnText = "Submit",
  value = "",
  ...restProps
}) => {
  const [input, setInput] = useState(value);
  const inputRef = useRef();
  //  khi gõ input mà ko dùng state ( trường hợp nếu input ko handle value của nó thì browser mặc định user nhập gì thì sẽ hiển thị cái đó)(two wibiding);
  let _onInputChange = (e) => {
    // mỗi lần user rõ thì set lại cái input bằng value mà user mới rõ vào state và state input sẽ re-render trigger cập nhật lại value trong input value = {input} và
    const value = e.target.value;
    setInput(value);
  };
  let _onSubmit = (e) => {
    e.preventDefault();
    // kiểm tra
    if (input) {
      handleSubmit?.(input);
      setInput("");
      inputRef.current.focus();
    } else {
      alert("Please enter information");
    }
  };
  return (
    <form className="form" onSubmit={_onSubmit}>
      <input
        className="input"
        type="text"
        // nếu control giá trị value vào một biến thì biến đó sẽ thay đổi khi render và sẽ nhận đc biến đó
        // còn ko control thig trình duyệt nó sẽ tự động control
        onChange={_onInputChange}
        value={input}
        ref={inputRef}
        {...restProps}
      />
      <Button className="btn">{btnText}</Button>
    </form>
  );
};

export default Form;
