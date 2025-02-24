import React from "react";
import { useAuth } from "../../hooks/useAuth";

function Logout () {
  const { logout } = useAuth();
  logout();
  return (
    <div>
        
    </div>
  );
}

export default Logout;