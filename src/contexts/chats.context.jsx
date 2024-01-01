import { createContext, useContext, useReducer } from "react";
import { UserContext } from "./user.context.jsx";

export const ChatsContext = createContext();

export const ChatsProvider = ({ children }) => {
  const { currentUser } = useContext(UserContext);

  const INITIAL_STATE = {
    user: {},
    chatId: "null",
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId: action.payload
            ? currentUser.uid > action.payload?.uid
              ? currentUser.uid + action.payload?.uid
              : action.payload?.uid + currentUser.uid
            : "null",
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  return (
    <ChatsContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatsContext.Provider>
  );
};
