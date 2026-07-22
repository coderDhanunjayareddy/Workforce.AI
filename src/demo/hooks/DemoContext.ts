import { createContext } from "react";

import type { DemoContextValue } from "../types/demo.types";

export const DemoContext = createContext<DemoContextValue | undefined>(undefined);
