import React from 'react';
import {
  ChatIcon,
  GroupIcon,
  InboxIcon,
  TemplateIcon,
  LogIcon,
  ContactIcon,
  LabelIcon,
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
    defaultPath: '/manageTemplate',
  },
  {
    title: 'Contact Management',
    icon: <ContactIcon />,
    defaultPath: '/manageContacts',
  },
  ,
  {
    title: 'Employee Management',
    icon: <GroupIcon />,
    defaultPath: '/employeesList',
  },
  ,
  {
    title: 'Label Management',
    icon: <LabelIcon />,
    defaultPath: '/manageLabels',
  },
];
