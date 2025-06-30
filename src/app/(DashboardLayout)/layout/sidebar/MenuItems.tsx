import {
  IconLayoutDashboard,
  IconEdit,
  IconUsers,
  IconNotebook,
  IconTags,
  IconFileText,
  IconWorld,
  IconCompass,
  IconFilePlus,
  IconClock,
  IconCheck,
  IconCategory,
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
    title: "View site",
    icon: IconWorld,
    href: "/view-site",
  },
  {
    id: uniqueId(),
    title: "Explore",
    icon: IconCompass,
    href: "/explore",
  },
  {
    navlabel: true,
    subheader: "CONTENT",
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
    icon: IconFilePlus,
    href: "/content/drafts",
  },
  {
    id: uniqueId(),
    title: "Scheduled",
    icon: IconClock,
    href: "/content/scheduled",
  },
  {
    id: uniqueId(),
    title: "Published",
    icon: IconCheck,
    href: "/content/published",
  },
  {
    navlabel: true,
    subheader: "UTILS",
  },
  {
    id: uniqueId(),
    title: "Pages",
    icon: IconFileText,
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
    title: "Category",
    icon: IconCategory,
    href: "/category",
  },
  {
    id: uniqueId(),
    title: "New Category",
    icon: null,
    href: "/category/new",
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
