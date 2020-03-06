import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import Keyboard from "react-simple-keyboard";
import inputMask from "simple-keyboard-input-mask";

import "react-simple-keyboard/build/css/index.css";

import "./styles.css";

function App() {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();

  const onChange = input => {
    setInput(input);
    console.log("Input changed", input);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = event => {
    let input = event.target.value;
    const keyboardInput = keyboard.current.getInput();

    /**
     * Masked keyboard value takes precedence
     * Except when deleting
     */
    if (input >= keyboardInput) {
      input = keyboardInput;
    }

    setInput(input);
    keyboard.current.setInput(input);
  };

  return (
    <div className="App">
      <input
        value={input}
        placeholder={"Tap on the virtual keyboard to start"}
        onChange={onChangeInput}
        className={"input"} // See inputMaskTargetClass below
      />
      <Keyboard
        keyboardRef={r => (keyboard.current = r)}
        layoutName={layout}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onModulesLoaded={() => {
          console.log("Modules loaded!");
        }}
        inputMask={"(99) 9999-9999"}
        // Or, if you have multiple inputs handled by simple-keybaord
        // inputMask={{
        //   default: "(99) 9999-9999"
        // }}
        modules={[inputMask]}
        // Optional ( If you want to handle *physical* keyboard typing):
        inputMaskPhysicalKeyboardHandling={true}
        inputMaskTargetClass={"input"} // Related to "inputMaskPhysicalKeyboardHandling". The input element handled by simple-keyboard must have this class.
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
