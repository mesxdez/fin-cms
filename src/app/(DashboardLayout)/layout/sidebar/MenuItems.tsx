import {
  
  IconLayoutDashboard,
  IconEdit,
  IconUsers,
  IconNotebook,
  IconTags

} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "HOME",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Posts",
    icon: IconEdit,
    href: "/content/posts",
  },
  {
    id: uniqueId(),
    title: "Drafts",
    icon: null,
    href: "/content/drafts",
  },
  {
    id: uniqueId(),
    title: "Scheduled",
    icon: null,
    href: "/content/scheduled",
  },
  {
    id: uniqueId(),
    title: "Published",
    icon: null,
    href: "/content/published",
  },
   {
    id: uniqueId(),
    title: "Pages",
    icon: IconNotebook,
    href: "/pages",
  },
   {
    id: uniqueId(),
    title: "Tags",
    icon: IconTags,
    href: "/tags",
  },
   {
    id: uniqueId(),
    title: "New Tags",
    icon: null,
    href: "/tags/new",
  },
  {
    id: uniqueId(),
    title: "Members",
    icon: IconUsers,
    href: "/members",
  },
   {
    id: uniqueId(),
    title: "New Member",
    icon: null,
    href: "/members/new",
  },
];

export default Menuitems;
