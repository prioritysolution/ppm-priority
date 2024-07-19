"use client";
import { FlexBox } from "@/common";
import FooterContainer from "@/container/Footer";
import NavBarContainer from "@/container/Navbar";
import SideBarContainer from "@/container/Sidebar";
import { Box } from "@mui/material";
import { FC, ReactNode } from "react";
import { pathName } from "@/utils/route";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashBoardHooks } from "@/container/Dashboard/Hooks";

interface LayoutInterface {
  children: ReactNode;
}

const Layout: FC<LayoutInterface> = ({ children }) => {
  const router = useRouter();
  const { token, orgId } = DashBoardHooks();

  useEffect(() => {
    if (!token || !orgId) router.replace(pathName.login);
  }, [token, orgId, router]);

  return (
    <Box className={`w-full min-h-screen`}>
      <NavBarContainer />
      <FlexBox>
        <SideBarContainer />
        <Box className="h-full" sx={{ flexGrow: 1 }}>
          <main>{children}</main>
          <FooterContainer />
        </Box>
      </FlexBox>
    </Box>
  );
};

export default Layout;
