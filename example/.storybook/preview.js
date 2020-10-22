import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { withThemesProvider } from 'storybook-styled-components-theme-selector';

import { Theme } from '../src/themes';
import { GlobalStyles } from '../src/global-styles';

addDecorator(
  withThemesProvider({
    children: <GlobalStyles />,
    themes: Object.values(Theme),
  }),
);

addParameters({ docs: { page: null } });
