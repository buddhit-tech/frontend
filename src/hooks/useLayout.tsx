import { useContext } from "react";
import LayoutContext from "../contexts/Layout/context";
import type { LayoutContextType } from "../contexts/Layout/types";

const useLayout = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};

export default useLayout;
