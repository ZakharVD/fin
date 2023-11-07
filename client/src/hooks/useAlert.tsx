import { useContext } from "react";
import { AlertContext } from "../context/alert.context";

export function useAlert() {
    return useContext(AlertContext);
}