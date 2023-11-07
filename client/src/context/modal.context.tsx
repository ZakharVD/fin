import { ReactNode, createContext, useReducer } from "react";

type ModalProviderProps = {
    children: ReactNode;
  };
  
  type ModalContextType = {
    showModal: boolean;
    activateModal: (content: JSX.Element) => void;
    deactivateModal: () => void;
    content: JSX.Element
  };
  
  type ModalState = {
    showModal: boolean;
    content: JSX.Element 
  };
  
  type ModalAction =
    | {
        type: "ACTIVATE";
        payload: {
            content: JSX.Element
        }
      }
    | {
        type: "DEACTIVATE";
      };
  
  const INITIAL_STATE: ModalState = {
    showModal: false,
    content: <></>
  };
  
  function modalReducer(state: ModalState, action: ModalAction): ModalState {
    switch (action.type) {
      case "ACTIVATE":
        return {
          ...state,
          showModal: true,
          content: action.payload.content
        };
      case "DEACTIVATE":
        return {
          ...state,
          showModal: false,
          content: <></>
        };
      default:
        throw new Error(`Unhandled type in modalReducer`);
    }
  }
  
  export const ModalContext = createContext<ModalContextType>({} as ModalContextType);
  
  export function ModalProvider({ children }: ModalProviderProps) {
    const [state, dispatch] = useReducer(modalReducer, INITIAL_STATE);
    const { showModal, content } = state;
  
    function activateModal(content: JSX.Element) {
      dispatch({
        type: "ACTIVATE",
        payload: {
            content: content
        }
      });
    }
  
    function deactivateModal() {
      dispatch({ type: "DEACTIVATE" });
    }
  
    return (
      <ModalContext.Provider
        value={{
          activateModal,
          deactivateModal,
          showModal,
          content,
        }}
      >
        {children}
      </ModalContext.Provider>
    );
  }