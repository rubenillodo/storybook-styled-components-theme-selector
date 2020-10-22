import { createGlobalStyle as css } from 'styled-components';

export const GlobalStyles = css`
  :root {
    background: ${({ theme }) => theme.color.bg.normal};
    color: ${({ theme }) => theme.color.text.normal};
    font-family: -apple-system, '.SFNSText-Regular', 'San Francisco', BlinkMacSystemFont,
      '.PingFang-SC-Regular', 'Microsoft YaHei', 'Segoe UI', 'Helvetica Neue', Helvetica, Arial,
      sans-serif;
  }

  body,
  *,
  *::before,
  *::after {
    font-family: inherit;
  }
`;
