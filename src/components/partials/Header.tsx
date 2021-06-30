import React, { useEffect, useState } from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AuthService from "../../services/AuthService";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const [username, setUsername] = useState<string | null>(null);
  useEffect(() => {
    setUsername(AuthService.getUsername());
  }, []);
  const logout = () => {
    AuthService.logoutUser();
    setUsername(null);
    history.push("/");
  };
  return (
    <div className="flex shadow-sm bg-gray-50  p-2.5 justify-between  ">
      <div className="flex space-x-3 ">
        <p className="text-gray-400">สวัสดี</p>
        <p>{username}</p>
      </div>
      <div className="flex mr-3 space-x-4 text-gray-400">
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ExitToAppIcon />}
          onClick={logout}
        >
          ออกจากระบบ
        </Button>
      </div>
    </div>
  );
};

export default Header;
