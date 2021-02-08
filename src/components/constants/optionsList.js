import React from 'react';
import InboxIcon from '@material-ui/icons/Inbox';
import ChatIcon from '@material-ui/icons/Chat';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import GroupIcon from '@material-ui/icons/Group';
import ReportIcon from '@material-ui/icons/Report';

export const optionsList = [
  {
    title: 'Send Message',
    icon: <ChatIcon style={{ color: '#FFFF' }} />,
    menuArr: [
      { title: 'Send Sms', link: 'sendSms' },
      { title: 'Send from Address book', link: 'sendFromAddressBook' },
      { title: 'Manage Schedule', link: 'manageSchedule' },
    ],
    defaultPath: 'sendSms',
  },
  {
    title: 'Inbox',
    icon: <InboxIcon style={{ color: '#FFFF' }} />,
    menuArr: [],
    defaultPath: 'inbox',
  },
  {
    title: 'Templates',
    icon: <AssignmentIcon style={{ color: '#FFFF' }} />,
    menuArr: [
      { title: 'Manage', link: 'manageTemplate' },
      { title: 'Add', link: 'addTemplate' },
    ],
    defaultPath: 'manageTemplate',
  },
  {
    title: 'Contact Management',
    icon: <PermContactCalendarIcon style={{ color: '#FFFF' }} />,
    menuArr: [
      { title: 'Manage', link: 'manageContacts' },
      { title: 'Add', link: 'addContacts' },
    ],
    defaultPath: 'manageContacts',
  },
  ,
  {
    title: 'Group Management',
    icon: <GroupIcon style={{ color: '#FFFF' }} />,
    menuArr: [
      { title: 'Manage', link: 'manageGroups' },
      { title: 'Add', link: 'addGroups' },
    ],
    defaultPath: 'manageGroups',
  },
  ,
  {
    title: 'Logs',
    icon: <ReportIcon style={{ color: '#FFFF' }} />,
    menuArr: [],
    defaultPath: 'logs',
  },
];

export const appBarList = [
  {
    title: 'Home',
  },
  {
    title: 'Account',
  },
  {
    title: 'Logout',
  },
];
