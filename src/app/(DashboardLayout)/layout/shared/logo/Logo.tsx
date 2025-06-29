/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <img src="/images/logos/Logo-1.png" alt="logo" width={174} />
    </LinkStyled>
  );
};

export default Logo;
