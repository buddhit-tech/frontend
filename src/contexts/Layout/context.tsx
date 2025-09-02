import { createContext } from "react";
import type { LayoutContextType } from "./types";

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export default LayoutContext;
