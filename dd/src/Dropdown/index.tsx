import * as React from "react";
import styled from "styled-components";
import MenuItem from "./menuItem";

const DropDownContainer = styled.div`
  position: relative;
  width: 20rem;
  max-width: 100%;
  > *:first-child {
    margin: 0;
    margin-bottom: 0;
  }
`;

const DropDownMenu = styled.ul`
  box-sizing: content-box;
  background-color: #fff;
  border: 1px solid #ccc;
  display: flex;
  flex-flow: column nowrap;
  flex-bases: 100%;
  opacity: ${({ visible }) => (visible ? "1" : "0")};
  height: ${({ visible }) => (visible ? "auto" : "0")};
  overflow: auto;
  transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1);
  position: absolute;
  right: 0;
  width: 100%;
  border-radius: 5px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: none;
  box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.11), 0 3px 10px rgba(0, 0, 0, 0.05),
    0 2px 3px rgba(0, 0, 0, 0.06);
  color: #5a6169;
  list-style: none;
  z-index: 10;
`;

const Divider = styled.li`
  background-color: #e9ecef;
  max-height: 2px;
  display: block;
  clear: both;
  width: 100%;
  padding: 0;
  margin: 0;
  min-height: 2px;
`;

export interface IMenuItem {
  label: string;
  to?: string;
  as?: React.ReactNode;
  icon?: React.ReactNode;
  divider?: boolean;
}

interface IDropDown {
  items: IMenuItem[];
  onSelect(): void;
  children: (toggle: ToggleMenu) => React.ReactNode;
  renderItem(item: IMenuItem): React.ReactNode;
}

interface IState {
  open: boolean;
}

export type ToggleMenu = ReturnType<DropDown["toggle"]>;

/**
 * Usage:
 * 
 * if you include "to" prop it will use NavLink, otherwise it will use an A href.
 * if you includ "as" prop it will use that as Component insteed.
 * ``` 
  <DropDown 
    onSelect={console.table} 
    items={[{label:string ,icon:<ReactNode />, to:'/home'}]}
    renderItem={fn?}>
    {(toggle)=><h4 onClick={toggle} > open </h4>}
  </DropDown>
   ```
 */
class DropDown extends React.PureComponent<IDropDown, IState> {
  readonly state = { open: false };

  componentWillUnmount() {
    this.stop();
  }

  toggle = () =>
    void this.setState({ open: !this.state.open }, () => {
      this.state.open ? this.start() : this.stop();
    });

  onSelect(item: IMenuItem, event: React.MouseEvent) {
    const { onSelect } = this.props;
    // event.preventDefault();
    event.stopPropagation();

    // action onClick
    onSelect && onSelect(item);
  }

  // event delegation to close menu if used click away
  start = () => document.addEventListener("click", this.toggle);
  stop = () => document.removeEventListener("click", this.toggle);

  render() {
    const { items, renderItem, children } = this.props;
    const { open } = this.state;

    return (
      <DropDownContainer>
        {children(this.toggle)}
        <DropDownMenu visible={open}>
          {renderItem
            ? items.map(renderItem)
            : items.map(({ divider, ...item }: IMenuItem, idx: number) =>
                divider ? (
                  <Divider key={idx} />
                ) : (
                  <MenuItem
                    key={item.label}
                    {...item}
                    onClick={this.onSelect.bind(this, item)}
                  />
                )
              )}
        </DropDownMenu>
      </DropDownContainer>
    );
  }
}

export default DropDown;
