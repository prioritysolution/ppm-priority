// components/Navbar.tsx
"use client";
import React, { FC } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Box,
  Drawer,
  CssBaseline,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Icon,
  Divider,
  Collapse,
  ClickAwayListener,
} from "@mui/material";
import {
  Call,
  Close,
  ExpandLess,
  ExpandMore,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import {
  FlexBetween,
  FlexItemCenter,
  //  SearchFieldInput
} from "@/common";
import text from "@/languages/en_US.json";
import { useRouter } from "next/navigation";
import { NavbarData } from "./NavbarData";
import Image from "next/image";
import { logo } from "@/Images";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

interface NavbarProps {
  handleToggleHamMenu(): void;
  openHamMenu: boolean;
  handleSubMenu(id: number): void;
  handleSubMenuClose(): void;
  openMenuId: number | null;
  logOutGetApiCall(): void;
  organizationName: string;
}

const Navbar: FC<NavbarProps> = ({
  handleToggleHamMenu,
  openHamMenu,
  openMenuId,
  handleSubMenu,
  handleSubMenuClose,
  logOutGetApiCall,
  organizationName,
}) => {
  const router = useRouter();
  const sideBarData = useSelector(
    (state: any) => state.sideBarData?.sideBarData
  );
  const financialYear = useSelector(
    (state: any) => state.sideBarData?.financialYear
  );

  const HamData: any = [
    ...sideBarData,
    {
      Menue_Icon: "notifications",
      Menue_Name: text.NavbarData.notifications,
      pathName: "",
    },
    {
      Menue_Icon: "call",
      Menue_Name: text.NavbarData.callSupport,
      pathName: "",
    },
    ...NavbarData,
  ];

  // console.log(HamData, 'hamData')
  const drawerWidth = "90%";

  return (
    <>
      <CssBaseline />
      <AppBar
        position="sticky"
        className={`bg-gradient-to-tr from-blue-500 via-indigo-500 to-sky-400 h-[4rem] w-full z-10`}
      >
        <Toolbar className="justify-between">
          <Typography
            component={`p`}
            className={`lg:!text-xl shrink-0 !capitalize !font-bold`}
          >
            {organizationName}&nbsp;
            {/* <Typography component={`span`} className='text-xs font-semibold'>
             ({dayjs(navFinancialYear[0]?.Fin_start).format('DD/MM/YYYY') } - {dayjs(navFinancialYear[0]?.to).format('DD/MM/YYYY') })
            </Typography> */}
          </Typography>

          <Box className="flex items-center space-x-2">
            {/* <SearchFieldInput onChange={() => { }} placeholder={text.placeholders.search} searchCls={`w-full`} /> */}

            <Box className="hidden md:flex items-center space-x-5">
              <IconButton color="inherit">
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              {/* Support Section */}
              <IconButton color="inherit" className="rounded-md">
                <FlexItemCenter gap={1} className={`cursor-pointer`}>
                  <Call />
                  <Typography component={`p`} className={`text-sm`}>
                    {text.support}
                  </Typography>
                </FlexItemCenter>
              </IconButton>
              {/* Profile Section */}
              {/* <Avatar alt="User Avatar" src="" className={`cursor-pointer`} onClick={(e: React.MouseEvent<HTMLElement>) => handleAvatarOpen(e)} /> */}
            </Box>

            {/* For smaller screens, show a menu button to toggle additional options */}
            <Box
              className="md:hidden cursor-pointer"
              onClick={handleToggleHamMenu}
            >
              <MenuIcon />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <ClickAwayListener onClickAway={handleSubMenuClose}>
        <Drawer
          open={openHamMenu}
          onClose={handleToggleHamMenu}
          anchor="right"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <FlexItemCenter
            className={`h-[5rem] p-5 sticky z-10 top-0 left-0 shadow bg-white`}
          >
            <FlexBetween className={`!w-full`}>
              <FlexItemCenter gap={2}>
                <Image src={logo} alt={`company logo`} height={50} />
                <Box className={`!w-full`}>
                  <Typography
                    component={`p`}
                    className={`!capitalize !font-semibold !text-sm md:!text-2xl`}
                  >
                    {organizationName}
                  </Typography>
                  <Typography
                    component={`p`}
                    className="text-xs font-semibold text-slate-500 ms-1"
                  >
                    Financial year:{" "}
                    {dayjs(financialYear[0]?.Fin_start).format("YYYY")} -{" "}
                    {dayjs(financialYear[0]?.Fin_To).format("YYYY")}
                  </Typography>
                </Box>
              </FlexItemCenter>
              <Close
                onClick={handleToggleHamMenu}
                className={`cursor-pointer`}
              />
            </FlexBetween>
          </FlexItemCenter>
          <nav>
            {HamData.map((hamData: any) => (
              <Box key={hamData.Menue_Name}>
                <ListItemButton
                  onClick={
                    hamData.SubMenue && hamData.SubMenue.length > 0
                      ? () => handleSubMenu(hamData.Menue_Id)
                      : hamData.Menue_Name.toLowerCase() === "logout"
                      ? () => {
                          logOutGetApiCall();
                          sessionStorage.clear();
                          router.push("login");
                        }
                      : () => {
                          router.push(`/dashboard`);
                          handleToggleHamMenu();
                        }
                  }
                >
                  <ListItemIcon>
                    <Icon>{hamData?.Menue_Icon}</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography component={`p`} className="text-lg font-bold">
                        {hamData.Menue_Name}
                      </Typography>
                    }
                  />
                  {hamData?.SubMenue && hamData.SubMenue.length > 0 && (
                    <>
                      {hamData.Menue_Id === openMenuId ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </>
                  )}
                </ListItemButton>
                <Divider />
                {hamData?.SubMenue && hamData.SubMenue.length > 0 && (
                  <Collapse
                    in={hamData.Menue_Id === openMenuId ? true : false}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {hamData.SubMenue.map((subMenu: any) => (
                        <Box key={subMenu.Id}>
                          <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={
                              subMenu.page_alis !== null
                                ? () => router.push(subMenu.page_alis)
                                : () => {}
                            }
                          >
                            <ListItemIcon>
                              <Icon>{subMenu.icon_class}</Icon>
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography
                                  component={`p`}
                                  className="text-sm font-semibold"
                                >
                                  {subMenu.Menue_Name}
                                </Typography>
                              }
                            />
                          </ListItemButton>
                          <Divider />
                        </Box>
                      ))}
                    </List>
                  </Collapse>
                )}
              </Box>
            ))}
          </nav>
        </Drawer>
      </ClickAwayListener>
    </>
  );
};

export default Navbar;
