import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Dropdown from "./Dropdown";
import { IMenuItem, ToggleMenu } from "./Dropdown/types";

const demoItems: IMenuItem[] = [
  { label: "one", icon: <span>T</span>, to: "/home" },
  { label: "Just string" },
  { label: "null", divider: true },
  { label: "Exit", icon: <span>X</span>, to: "/exit", style: { color: "red" } }
];

export default class App extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <Router>
        <div>
          <h1> Dropdown using array of items </h1>
          <Dropdown onSelect={console.table} items={demoItems}>
            {toggle => <h4 onClick={toggle}> open </h4>}
          </Dropdown>
          <hr />
          <h1> Dropdown with custom render </h1>
          <Dropdown
            onSelect={console.table}
            items={demoItems}
            renderItem={customRender}
          >
            {(toggle: ToggleMenu) => <button onClick={toggle}> open </button>}
          </Dropdown>

          <div style={{ width: "100px", border: "1px solid", margin: "5rem" }}>
            <h5> test narrow </h5>
            <Dropdown
              onSelect={console.table}
              items={demoItems}
              renderItem={customRender}
            >
              {(toggle: ToggleMenu) => <button onClick={toggle}> open </button>}
            </Dropdown>
          </div>
        </div>
      </Router>
    );
  }
}

function customRender({ divider, label, style, ...props }: IMenuItem) {
  return (
    <li
      style={{
        ...style,
        background: divider ? "#222" : "#FFF",
        overflow: "hidden",
        borderBottom: "1px solid #CCC",
        height: divider ? "2px" : "auto"
      }}
      {...props}
    >
      this is custom for <label>{label}</label>
    </li>
  );
}
