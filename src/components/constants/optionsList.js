import React from 'react';
import InboxIcon from '@material-ui/icons/Inbox';
import ChatIcon from '@material-ui/icons/Chat';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import GroupIcon from '@material-ui/icons/Group';
import ReportIcon from '@material-ui/icons/Report';
import LabelIcon from '@material-ui/icons/Label';

export const optionsList = [
  {
    title: 'Send Message',
    icon: <ChatIcon style={{ color: '#FFFF' }} />,
    menuArr: [
      { title: 'Send Sms', link: 'sendSms' },
      { title: 'Send from Address book', link: 'sendFromAddressBook' },
      //{ title: 'Manage Schedule', link: 'manageSchedule' },
    ],
    defaultPath: 'sendSms',
    value: 'quickSend',
  },

  {
    title: 'Templates',
    icon: <AssignmentIcon style={{ color: '#FFFF' }} />,
    menuArr: [
      { title: 'Manage', link: 'manageTemplate' },
      { title: 'Add', link: 'addTemplate' },
    ],
    defaultPath: 'manageTemplate',
    value: 'templateManagement',
  },
  {
    title: 'Contact Management',
    icon: <PermContactCalendarIcon style={{ color: '#FFFF' }} />,
    menuArr: [
      { title: 'Manage', link: 'manageContacts' },
      { title: 'Add', link: 'addContacts' },
    ],
    defaultPath: 'manageContacts',
    value: 'contactManagement',
  },
  ,
  {
    title: 'Label Management',
    icon: <LabelIcon style={{ color: '#FFFF' }} />,
    menuArr: [
      { title: 'Manage', link: 'managelabels' },
      { title: 'Add', link: 'addlabel' },
    ],
    defaultPath: 'managelabels',
    value: 'labelManagement',
  },
  {
    title: 'Employee',
    icon: <GroupIcon style={{ color: '#FFFF' }} />,
    menuArr: [
      { title: 'All Employees', link: 'employeesList' },
      { title: 'Manage Access', link: 'manageEmployeeAccess' },
    ],
    defaultPath: 'employeesList',
    value: 'employeeManagement',
  },
];

export const singleOptionList = [
  {
    title: 'Inbox',
    icon: <InboxIcon style={{ color: '#FFFF' }} />,
    menuArr: [],
    defaultPath: 'inbox',
    value: 'inbox',
  },

  // {
  //   title: 'Logs',
  //   icon: <ReportIcon style={{ color: '#FFFF' }} />,
  //   menuArr: [],
  //   defaultPath: 'logs',
  // },
];

export const appBarList = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Account',
    path: '/',
  },
  {
    title: 'Logout',
    path: '/',
  },
];
