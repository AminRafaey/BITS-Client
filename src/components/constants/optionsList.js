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
      { title: 'Send Sms' },
      { title: 'Send from Address book' },
      { title: 'Manage Schedule' },
    ],
  },
  {
    title: 'Inbox',
    icon: <InboxIcon style={{ color: '#FFFF' }} />,
    menuArr: [],
  },
  {
    title: 'Templates',
    icon: <AssignmentIcon style={{ color: '#FFFF' }} />,
    menuArr: [{ title: 'Manage' }, { title: 'Add' }],
  },
  {
    title: 'Contact Management',
    icon: <PermContactCalendarIcon style={{ color: '#FFFF' }} />,
    menuArr: [{ title: 'Manage' }, { title: 'Add' }],
  },
  ,
  {
    title: 'Group Management',
    icon: <GroupIcon style={{ color: '#FFFF' }} />,
    menuArr: [{ title: 'Manage' }, { title: 'Add' }],
  },
  ,
  {
    title: 'Logs',
    icon: <ReportIcon style={{ color: '#FFFF' }} />,
    menuArr: [],
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
