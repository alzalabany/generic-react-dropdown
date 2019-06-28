import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Dropdown, { ToggleMenu } from "./Dropdown";

const demoItems = [
  { label: "one", icon: <span>T</span>, to: "/home" },
  { label: "Just string" },
  { divider: true },
  { label: "Exit", icon: <span>X</span>, to: "/exit", style: { color: "red" } }
];

class App extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <Router>
        <div>
          <h1> Dropdown using array of items </h1>
          <Dropdown
            onSelect={console.table}
            items={demoItems}
            renderItem={null}
          >
            {(toggle: ToggleMenu) => <h4 onClick={toggle}> open </h4>}
          </Dropdown>
          <hr />
          <h1> Dropdown with custom render </h1>
          <Dropdown
            onSelect={console.table}
            items={demoItems}
            renderItem={null}
          >
            {(toggle: ToggleMenu) => <h4 onClick={toggle}> open </h4>}
          </Dropdown>
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById("root"));
