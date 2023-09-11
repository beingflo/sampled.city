import { useLocation, useNavigate } from "@solidjs/router";
import type { Component } from "solid-js";
import { tinykeys } from "tinykeys";

export const Hotkeys: Component = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const toggleManage = () => {
    if (location.pathname === "/manage") {
      navigate("/");
    } else {
      navigate("/manage");
    }
  };

  tinykeys(window, { m: toggleManage });

  return null;
};
