import MainIcon from 'shared/assets/icons/main-20-20.svg';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

import type { SidebarItemType } from './types';

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RoutePath.main,
    text: 'Главная',
    icon: MainIcon,
  },
  {
    path: RoutePath.about,
    text: 'О сайте',
    icon: AboutIcon,
  },
  {
    path: RoutePath.profile,
    text: 'Профиль',
    icon: ProfileIcon,
  },
];
