import React, {FC} from 'react';
import {logout} from "../../config/firebase";
import Button from "@mui/material/Button";

interface LogOutProps{
    t: (key: string) => string;
}
const LogOut:FC<LogOutProps> = (props) => {
    const {t} = props
    const logOutHandler = async () => {
        try {
            await logout();
        } catch (error) {
            console.log("Error log", error);
        } finally {
            console.log('finally')
        }
    };
    return (
      <div>
        <Button variant="contained" onClick={logOutHandler}>
          {t("profile.logOut")}
        </Button>
      </div>
    );
};

export default LogOut;