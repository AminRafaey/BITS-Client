import React from 'react';
import stateCloner from '../components/utility/StateCloner';

const ChatState = React.createContext(null);
const ChatDispatch = React.createContext(null);

function ChatReducer(state, action) {
  switch (action.type) {
    case 'LOAD_CHATS':
      return [...stateCloner(action.payload.chats)];
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ChatProvider({ children, chat }) {
  const [state, dispatch] = React.useReducer(
    ChatReducer,
    chat && chat.length > 0 ? chat : []
  );
  return (
    <ChatState.Provider value={state}>
      <ChatDispatch.Provider value={dispatch}>{children}</ChatDispatch.Provider>
    </ChatState.Provider>
  );
}

function useChatState() {
  const context = React.useContext(ChatState);
  if (context === undefined) {
    throw new Error('useChatState must be used inside a ChatProvider');
  }
  return context;
}

function useChatDispatch() {
  const context = React.useContext(ChatDispatch);
  if (context === undefined) {
    throw new Error('useChatDispatch must be used inside a ChatProvider');
  }
  return context;
}

export { ChatProvider, useChatState, useChatDispatch, loadChats };

function loadChats(dispatch, data) {
  dispatch({
    type: 'LOAD_CHATS',
    payload: data,
  });
}
