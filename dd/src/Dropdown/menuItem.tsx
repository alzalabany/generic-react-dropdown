import * as React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { IMenuItem } from "./index";

const Item = styled.li`
  padding: 0
  overflow: hidden;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Link = styled.a`
  display: block;
  width: 100%;
  padding: 1rem 2rem;
  > span {
    position: relative;
    top: 2px;
    min-width: 2rem;
    margin-right: 0.5rem;
  }
`;

type ImenuItem = React.SFC & HTMLButtonElement;

const MenuItem: ImenuItem = ({ label, icon, ...props }: IMenuItem) => (
  <Item>
    <Link {...props} as={props.to ? NavLink : props.as}>
      {icon && <span>{icon}</span>}
      {label}
    </Link>
  </Item>
);

export default MenuItem;
