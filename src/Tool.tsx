import React, { useCallback } from 'react';
import { styled } from '@storybook/theming';
import { Icons, IconButton, WithTooltip, TooltipLinkList } from '@storybook/components';

import { useTheme } from './useTheme';

const IconButtonWithLabel = styled(IconButton)(() => ({
  display: 'inline-flex',
  alignItems: 'center',
}));

export const Tool = () => {
  const { themes, currentThemeId, changeTheme } = useTheme();

  const tooltip = useCallback(
    ({ onHide }) => {
      return (
        <TooltipLinkList
          links={themes.map((it) => ({
            id: it.id,
            loading: false,
            title: it.name,
            disabled: it.id === currentThemeId,
            onClick: () => {
              changeTheme({ themeId: it.id });
              onHide();
            },
          }))}
        />
      );
    },
    [themes, currentThemeId, changeTheme],
  );

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltip={themes ? tooltip : undefined}
      closeOnClick
    >
      <IconButtonWithLabel key="theme" title="Change theme">
        <Icons icon="paintbrush" />
      </IconButtonWithLabel>
    </WithTooltip>
  );
};
