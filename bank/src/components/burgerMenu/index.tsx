import React, {FC, useState} from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import SwitcherLanguage from "../switcherLanguage";
import ThemeSwitcher from "../themeSwitcher";
import WidgetsIcon from "@mui/icons-material/Widgets";
import {Link} from "react-router-dom";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentsIcon from "@mui/icons-material/Payments";
import HistoryIcon from "@mui/icons-material/History";

interface BurgerMenuProps {
    t: (key: string) => string;
    theme: "dark" | "light";
}


const BurgerMenu: FC<BurgerMenuProps> = ({t, theme}) => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
    ) => {
        if (event.type === "keydown") {
            return;
        }
        setOpen(open);
    };
    const handleLinkClick = () => {
        setOpen(false);
    };

    const styles = {
        appBar: {
            position: "absolute",
            backgroundColor: "white",
            width: "0px",
            left: "1px",
        },
        dragHandleIcon: {
            color: "black",
        },
        drawerContainer: {
            p: 2,
            height: 1,
        },
        closeButton: {
            mb: 2,
        },
        listItemButtonContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "8px",
        },
        link: {
            color: theme === "dark" ? "white" : "black",
            textDecoration: "none",
        },
        bottomBox: {
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            bottom: "0",
            left: "50%",
            transform: "translate(-50%, 0)",
        },
        list: {
            display: "flex", alignItems: "center"
        },
        widget: {
            marginRight: "8px"
        },
        divider: {
            mb: 2
        }
    };
    return (
        <AppBar position="absolute" sx={styles.appBar}>
            <DragHandleIcon
                style={styles.dragHandleIcon}
                onClick={toggleDrawer(true)}
            />

            <Container maxWidth="lg">
                <Drawer
                    anchor="left"
                    open={open}
                    onClose={toggleDrawer(false)}
                    // @ts-ignore
                    onOpen={toggleDrawer(true)}
                >
                    <Box sx={styles.drawerContainer}>
                        <IconButton sx={styles.closeButton}>
                            <CloseIcon onClick={toggleDrawer(false)}/>
                        </IconButton>

                        <Divider sx={styles.divider}/>

                        <Box sx={styles.listItemButtonContainer}>
                            <ListItemButton sx={styles.list}>
                                <WidgetsIcon sx={styles.widget}/>
                                <Link
                                    to="/home"
                                    style={styles.link}
                                    onClick={handleLinkClick}
                                >
                                    {t("leftSide.myBank")}
                                </Link>
                            </ListItemButton>
                            <ListItemButton sx={styles.list}>
                                <CreditCardIcon sx={styles.widget}/>
                                <Link
                                    to="/cards"
                                    style={styles.link}
                                    onClick={handleLinkClick}
                                >
                                    {t("leftSide.myCard")}
                                </Link>
                            </ListItemButton>
                            <ListItemButton sx={styles.list}>
                                <PaymentsIcon sx={styles.widget}/>
                                <Link
                                    to="/requisites"
                                    style={styles.link}
                                    onClick={handleLinkClick}
                                >
                                    {t("leftSide.payment")}
                                </Link>
                            </ListItemButton>
                            <ListItemButton sx={styles.list}>
                                <HistoryIcon sx={styles.widget}/>
                                <Link
                                    to="/transaction-history"
                                    style={styles.link}
                                    onClick={handleLinkClick}
                                >
                                    {t("leftSide.history")}
                                </Link>
                            </ListItemButton>
                        </Box>

                        <Box sx={styles.bottomBox}>
                            <SwitcherLanguage/>
                            <ThemeSwitcher/>
                        </Box>
                    </Box>
                </Drawer>
            </Container>
        </AppBar>
    );
};

export default BurgerMenu;
