import React from 'react';
import {
  ChatIcon,
  GroupIcon,
  InboxIcon,
  TemplateIcon,
  LogIcon,
  ContactIcon,
} from '../../resources';

export const iconList = [
  {
    title: 'Send Message',
    icon: <ChatIcon />,
    defaultPath: '/sendFromAddressBook',
  },
  {
    title: 'Inbox',
    icon: <InboxIcon />,
    defaultPath: '/inbox',
  },
  {
    title: 'Templates',
    icon: <TemplateIcon />,
    defaultPath: '/addTemplate',
  },
  {
    title: 'Contact Management',
    icon: <ContactIcon />,
    defaultPath: '/manageContacts',
  },
  ,
  {
    title: 'Label Management',
    icon: <GroupIcon />,
    defaultPath: '/addLabel',
  },
  ,
  {
    title: 'Logs',
    icon: <LogIcon />,
    defaultPath: '/logs',
  },
];
