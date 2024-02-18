import { NavIcons } from '@/components/layout/NavIcons';

export const nav = [
  {
    path: '/',
    iconActive: NavIcons.homeActive,
    iconInactive: NavIcons.homeInactive,
    label: 'Home',
  },
  {
    path: '/communities',
    iconActive: NavIcons.communityActive,
    iconInactive: NavIcons.communityInactive,
    label: 'Communities',
  },
  {
    path: '/explore',
    iconActive: NavIcons.exploreActive,
    iconInactive: NavIcons.exploreInactive,
    label: 'Explore',
  },
  {
    path: '/notifications',
    iconActive: NavIcons.notificationsActive,
    iconInactive: NavIcons.notificationsInactive,
    label: 'Notifications',
  },
  {
    path: '/messages',
    iconActive: NavIcons.messagesActive,
    iconInactive: NavIcons.messagesInactive,
    label: 'Messages',
  },
];
