import React from 'react';
import stateCloner from '../components/utility/StateCloner';

const ChatState = React.createContext(null);
const ChatDispatch = React.createContext(null);

function ChatReducer(state, action) {
  const cloneState = stateCloner(state);
  const { messages, jid } = action.payload;
  console.log(messages, jid);
  switch (action.type) {
    case 'LOAD_CHATS':
      return [...stateCloner(action.payload.chats)];
    case 'ADD_MESSAGES':
      const index = cloneState.findIndex((c) => c.jid === jid);
      index !== -1 &&
        (cloneState[index]['messages'] = [
          ...cloneState[index]['messages'],
          ...messages.reverse(),
        ]);
      console.log(cloneState);
      return [...cloneState];
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

export { ChatProvider, useChatState, useChatDispatch, loadChats, addMessages };

function loadChats(dispatch, data) {
  dispatch({
    type: 'LOAD_CHATS',
    payload: data,
  });
}

function addMessages(dispatch, data) {
  dispatch({
    type: 'ADD_MESSAGES',
    payload: data,
  });
}
