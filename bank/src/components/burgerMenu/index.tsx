import React, { FC, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import Button from "@mui/material/Button";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import styles from "../layout/leftSide/style.module.css";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";
import SwitcherLanguage from "../switcherLanguage";
import ThemeSwitcher from "../themeSwitcher";

const BurgerMenu = () => {
  const { i18n } = useTranslation();
  const [open, setState] = useState(false);

  // @ts-ignore
  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown") {
      return;
    }
    setState(open);
  };

  return (
    <AppBar
      position="absolute"
      sx={{
        backgroundColor: "white",
        width: "0px",
        left: "1px",
      }}
    >
      <DragHandleIcon style={{ color: "black" }} onClick={toggleDrawer(true)} />

      <Container maxWidth="lg">
        <Drawer
          anchor="left"
          open={open}
          onClose={toggleDrawer(false)}
          // @ts-ignore
          onOpen={toggleDrawer(true)}
        >
          <Box
            sx={{
              backgroundColor: "#0099dc",
              p: 2,
              height: 1,
            }}
          >
            <IconButton sx={{ mb: 2 }}>
              <CloseIcon onClick={toggleDrawer(false)} />
            </IconButton>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ mb: 2 }}>
              <ListItemButton></ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <DescriptionIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Documents" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <FolderIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Other" />
              </ListItemButton>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                bottom: "0",
                left: "50%",
                transform: "translate(-50%, 0)",
              }}
            >
              <SwitcherLanguage />
              <ThemeSwitcher className={styles.themeSwitcher} />
            </Box>
          </Box>
        </Drawer>
      </Container>
    </AppBar>
  );
};
export default BurgerMenu;
