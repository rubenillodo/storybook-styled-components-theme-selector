import { useMemo, useCallback, useEffect } from 'react';
import { useAddonState } from '@storybook/api';
import addons from '@storybook/addons';

import { Events, ADDON_ID } from './constants';

type Theme = { id: string; name: string };

export const useTheme = () => {
  const [themes, setThemes] = useAddonState<Theme[]>(`${ADDON_ID}/themes`, []);
  const [currentThemeId, setCurrentThemeId] = useAddonState<string | null>(
    `${ADDON_ID}/currentTheme`,
    null,
  );

  const changeTheme = useCallback(
    ({ themeId }: { themeId: string }) => {
      setCurrentThemeId(themeId);
      addons.getChannel().emit(Events.themeChanged, { themeId });
    },
    [setCurrentThemeId],
  );

  useEffect(() => {
    const listener = ({ themes, defaultTheme }: { themes: Theme[]; defaultTheme: Theme }) => {
      setThemes(themes);

      if (!currentThemeId) {
        setCurrentThemeId(defaultTheme.id);
      }

      addons.getChannel().emit(Events.themeChanged, { themeId: currentThemeId ?? defaultTheme.id });
    };

    addons.getChannel().on(Events.setThemes, listener);
    return () => addons.getChannel().removeListener(Events.setThemes, listener);
  }, [currentThemeId, setCurrentThemeId, setThemes]);

  return useMemo(() => ({ themes, currentThemeId, changeTheme }), [
    themes,
    currentThemeId,
    changeTheme,
  ]);
};
