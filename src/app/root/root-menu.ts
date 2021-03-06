import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'icon ion-ios-home',
    link: '/home',
    home: true,
  },
  {
    title: 'User',
    icon: 'icon ion-ios-person',
    link: '/user',
    children: [
      {
        title: 'Profile',
        link: '/user/profile',
      },
    ],
  },
  {
    title: 'System',
    icon: 'icon ion-bug',
    link: '/system',
    children: [
      {
        title: 'Info',
        link: '/system/info',
      },
      {
        title: 'Dictionary',
        link: '/system/dictionary',
      },
    ],
  },
];
