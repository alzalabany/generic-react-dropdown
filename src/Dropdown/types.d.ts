import { ReactNode } from "react";

export type ToggleMenu = () => void;

export interface IMenuItem {
  label: string;
  to?: string;
  as?: ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  icon?: ReactNode;
  divider?: boolean;
  style?: any;
}

export interface IDropDown {
  items: Array<IMenuItem>;
  onSelect?(item: IMenuItem): void;
  children: (toggle: ToggleMenu) => ReactNode;
  renderItem?(item: IMenuItem): ReactNode;
}
