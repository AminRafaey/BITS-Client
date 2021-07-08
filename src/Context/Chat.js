import React from 'react';
import stateCloner from '../components/utility/StateCloner';

const ChatState = React.createContext(null);
const ChatDispatch = React.createContext(null);

function ChatReducer(state, action) {
  const cloneState = stateCloner(state);
  const { messages, jid, message, unreadCount, chat } = action.payload;
  switch (action.type) {
    case 'LOAD_CHATS':
      return [...stateCloner(action.payload.chats)];
    case 'ADD_MESSAGES': {
      const index = cloneState.findIndex((c) => c.jid === jid);
      index !== -1 && (cloneState[index]['messages'] = [...messages]);
      return [...cloneState];
    }
    case 'ADD_MESSAGE': {
      const index = cloneState.findIndex((c) => c.jid === jid);
      index !== -1 && cloneState[index]['messages'].push(message);
      index !== -1 && (cloneState[index]['t'] = Date.now())
      return [...cloneState];
    }
    case 'MARK_AS_UNREAD': {
      const index = cloneState.findIndex((c) => c.jid === jid);
      index !== -1 && (cloneState[index]['count'] = 0);
      return [...cloneState];
    }
    case 'ADD_UNREAD': {
      const index = cloneState.findIndex((c) => c.jid === jid);
      index !== -1 &&
        (cloneState[index]['count'] = cloneState[index]['count'] + unreadCount);
      return [...cloneState];
    }
    case 'ADD_NEW_CHAT': {
      return [chat, ...cloneState];
    }
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

export {
  ChatProvider,
  useChatState,
  useChatDispatch,
  loadChats,
  addMessages,
  addMessage,
  markAsUnread,
  addUnread,
  addNewChat,
};

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

function addMessage(dispatch, data) {
  dispatch({
    type: 'ADD_MESSAGE',
    payload: data,
  });
}
function markAsUnread(dispatch, data) {
  dispatch({
    type: 'MARK_AS_UNREAD',
    payload: data,
  });
}
function addUnread(dispatch, data) {
  dispatch({
    type: 'ADD_UNREAD',
    payload: data,
  });
}
function addNewChat(dispatch, data) {
  dispatch({
    type: 'ADD_NEW_CHAT',
    payload: data,
  });
}
