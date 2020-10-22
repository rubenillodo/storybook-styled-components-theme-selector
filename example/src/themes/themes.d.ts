import 'styled-components';
import { ThemeType } from './ThemeType';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
