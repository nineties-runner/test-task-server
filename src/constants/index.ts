import { SideBarItemProps } from "../components/SideBarItem/SideBarItem";

export const menuItems: SideBarItemProps[] = [
  {
    id: "0",
    name: "CMDB",
    children: [{ title: "PCs and servers", url: "/cmdb/servers" }],
  },
];
