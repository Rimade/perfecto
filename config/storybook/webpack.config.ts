import path from 'path';

import type { Configuration } from 'webpack';
import { DefinePlugin } from 'webpack';

import { buildCssLoader } from '../build/loaders/buildCssLoader';
import type { BuildPaths } from '../build/types/config';

export default ({ config }: { config: Configuration }) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
  };
  config.resolve!.modules!.push(paths.src);
  config.resolve!.extensions!.push('.ts', '.tsx');

  config.module!.rules = config.module!.rules!.map((rule) => {
    if (rule && typeof rule === 'object' && rule.test && /svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i };
    }

    return rule;
  });

  config.module!.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });
  config.module!.rules.push(buildCssLoader(true));

  config.plugins!.push(
    new DefinePlugin({
      __IS_DEV__: true,
    }),
  );

  return config;
};
