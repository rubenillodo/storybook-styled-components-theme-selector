import React, { useMemo, useState, useEffect } from 'react';
import { parse as parseQuery } from 'query-string';
import { ThemeProvider as DefaultThemeProvider } from 'styled-components';
import addons, { StoryWrapper } from '@storybook/addons';

import { Events } from './constants';
import { ThemeType } from './ThemeType';

export type Props = {
  ThemeProvider?: typeof DefaultThemeProvider;
  children?: React.ReactNode;
  themes: ThemeType[];
};

export const withThemesProvider = ({
  ThemeProvider = DefaultThemeProvider,
  children,
  themes,
}: Props): StoryWrapper => (storyFn, context) => {
  const urlTheme = useMemo(() => {
    if (typeof location === 'undefined') return null; // eslint-disable-line no-restricted-globals

    const { themeId } = parseQuery(location.search); // eslint-disable-line no-restricted-globals
    if (typeof themeId !== 'string') return null;

    return themes.find((it) => it.id === themeId) ?? null;
  }, []);

  const defaultTheme = useMemo(() => urlTheme ?? themes[0], [urlTheme]);
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const listener = ({ themeId }: { themeId: string }) =>
      setTheme(themes.find((it) => it.id === themeId) ?? defaultTheme);
    addons.getChannel().on(Events.themeChanged, listener);
    return () => addons.getChannel().removeListener(Events.themeChanged, listener);
  }, [defaultTheme]);

  useEffect(() => {
    addons.getChannel().emit(Events.setThemes, { themes, defaultTheme });
  }, [defaultTheme]);

  return (
    <ThemeProvider theme={theme}>
      {children}
      {storyFn(context)}
    </ThemeProvider>
  );
};
