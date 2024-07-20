"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
  Avatar,
  CircularProgress,
  ClickAwayListener,
  Collapse,
  Icon,
  IconButton,
  ListItemAvatar,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { FlexBetween, FlexItemCenter } from "@/common";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { ExpandLess, ExpandMore, Logout } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import styles from "./sideBar.module.css";
import SideBarSkeleton from "./SideBarSkeleton";

const drawerWidth = 300;

interface SideBarProps {
  logOutGetApiCall(): void;
  handleSubMenu(id: number): void;
  openMenuId: number | null;
  handleSubMenuClose(): void;
  loader: boolean;
  logOutLoader: boolean;
  orgName: string;
}

export const SideBar: React.FC<SideBarProps> = ({
  logOutGetApiCall,
  handleSubMenu,
  openMenuId,
  logOutLoader,
  handleSubMenuClose,
  loader,
  orgName = "",
}) => {
  const router = useRouter();
  const pathName = usePathname();
  // const orgName = getSessionStorageData("orgName") || "--";
  const financialYear = useSelector(
    (state: any) => state.sideBarData?.financialYear
  );
  const sideBarData = useSelector(
    (state: any) => state.sideBarData?.sideBarData
  );

  // console.log(pathName, '* path')
  return (
    <ClickAwayListener onClickAway={handleSubMenuClose}>
      <Box
        sx={{ display: "flex" }}
        className={`hidden md:flex z-[9] ${styles.scrollbar}`}
      >
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <FlexBetween className="!flex-col !w-full !h-full">
            {loader ? (
              <SideBarSkeleton />
            ) : (
              <Box sx={{ overflow: "auto" }} className={`!w-full`}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  {sideBarData &&
                    sideBarData.length > 0 &&
                    sideBarData?.map((data: any) => (
                      <Box key={data.Menue_Id}>
                        <ListItemButton
                          onClick={
                            data.SubMenue && data.SubMenue.length > 0
                              ? () => handleSubMenu(data.Menue_Id)
                              : data.Page_Alies !== null
                              ? () => router.push(data.Page_Alies)
                              : () => {}
                          }
                        >
                          <ListItemIcon>
                            <Icon>{data?.Menue_Icon}</Icon>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                component={`p`}
                                className="text-sm font-bold"
                              >
                                {data.Menue_Name}
                              </Typography>
                            }
                          />
                          {data?.SubMenue && data.SubMenue.length > 0 && (
                            <>
                              {data.Menue_Id === openMenuId ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )}
                            </>
                          )}
                        </ListItemButton>
                        <Divider />
                        {data?.SubMenue && data.SubMenue.length > 0 && (
                          <Collapse
                            in={data.Menue_Id === openMenuId ? true : false}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List component="div" disablePadding>
                              {data.SubMenue.map((subMenu: any) => (
                                <Box key={subMenu.Id}>
                                  <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={
                                      subMenu.page_alis !== null
                                        ? () => router.push(subMenu.page_alis)
                                        : () => {}
                                    }
                                    selected={
                                      subMenu.page_alias === pathName
                                        ? true
                                        : false
                                    }
                                  >
                                    <ListItemIcon>
                                      <Icon>{subMenu.icon_class}</Icon>
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={
                                        <Typography
                                          component={`p`}
                                          className="text-xs font-semibold"
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
                </List>
              </Box>
            )}
            {/* <pre>{JSON.stringify({ financialYear }, null, 4)}</pre> */}
            <FlexItemCenter className="w-full px-2 sticky bottom-0 left-0 z-10 bg-white">
              <ListItem>
                <ListItemAvatar>
                  <Avatar className="bg-sky-500 capitalize">
                    {orgName?.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      component={`p`}
                      className={`font-semibold text-sm capitalize`}
                    >
                      {orgName}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        className="text-xs font-semibold"
                      >
                        Financial Year:{" "}
                        {financialYear[0]
                          ? dayjs(financialYear[0]?.Fin_start).format("YYYY")
                          : "--"}{" "}
                        -{" "}
                        {financialYear[0]
                          ? dayjs(financialYear[0]?.Fin_To).format("YYYY")
                          : "--"}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              {logOutLoader ? (
                <CircularProgress size={20} color="secondary" />
              ) : (
                <IconButton onClick={logOutGetApiCall}>
                  <Logout fontSize="small" />
                </IconButton>
              )}
            </FlexItemCenter>
          </FlexBetween>
        </Drawer>
      </Box>
    </ClickAwayListener>
  );
};

export default SideBar;
