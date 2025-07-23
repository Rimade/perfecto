import type { VFC, SVGProps } from 'react';

export const Icon = ({
  icon: IconComponent,
  ...props
}: {
  icon: VFC<SVGProps<SVGSVGElement>>;
} & SVGProps<SVGSVGElement>) => {
  return <IconComponent {...props} />;
};
