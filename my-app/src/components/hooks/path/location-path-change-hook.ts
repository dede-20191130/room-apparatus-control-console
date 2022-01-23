import { useEffect } from "react";
import { Location,useLocation } from "react-router";

export const useLocationPathChange = (action: (location?: Location, ...args: unknown[]) => unknown, ...args: unknown[]) => {
    const location = useLocation();
    useEffect(() => { action(location, args) }, [location.pathname]);
  }