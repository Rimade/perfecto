import type { VFC, SVGProps } from 'react';
import type { RoutePath } from 'shared/config/routeConfig/routeConfig';

export interface SidebarItemType {
  path: (typeof RoutePath)[keyof typeof RoutePath];
  text: string;
  icon: VFC<SVGProps<SVGSVGElement>>;
}
