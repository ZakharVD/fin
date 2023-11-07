import { ReactNode, createContext, useReducer } from "react";
import { alertOptions } from "../constants/alertOptions.enum";

type AlertProvideProps = {
  children: ReactNode;
}; 
type TAlert = alertOptions.red | alertOptions.yellow | alertOptions.green | undefined;

type TAlertContext = {
  alertMessage: string;
  showAlert: boolean;
  alertType: TAlert;
  activateAlert: (message: string, type: TAlert | undefined) => void;
  deactivateAlert: () => void;
};

const INITIAL_STATE: TState = {
  showAlert: false,
  alertMessage: "",
  alertType: undefined,
};

type TState = {
  showAlert: boolean;
  alertMessage: string;
  alertType: TAlert | undefined;
};
type TAction =
  | {
      type: "ACTIVATE";
      payload: {
        message: string;
        type: TAlert;
      };
    }
  | {
      type: "DEACTIVATE";
    };

// reducer
function alertReducer(state: TState, action: TAction) {
  switch (action.type) {
    case "ACTIVATE":
      return {
        ...state,
        showAlert: true,
        alertMessage: action.payload.message,
        alertType: action.payload.type,
      };
    case "DEACTIVATE":
      return {
        ...state,
        showAlert: false,
        alertMessage: "",
        alertType: undefined,
      };
    default:
      throw new Error(`Unhandled type in alertReducer`);
  }
}

export const AlertContext = createContext({} as TAlertContext);

export function AlertProvider({ children }: AlertProvideProps) {
  const [state, dispatch] = useReducer(alertReducer, INITIAL_STATE);
  const { showAlert, alertMessage, alertType } = state;
  
  function activateAlert(message: string, type: TAlert | undefined) {
    dispatch({ type: "ACTIVATE", payload: { message, type } });
  }

  function deactivateAlert() {
    dispatch({ type: "DEACTIVATE" });
  }

  return (
    <AlertContext.Provider
      value={{
        alertMessage,
        showAlert,
        alertType,
        activateAlert,
        deactivateAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}