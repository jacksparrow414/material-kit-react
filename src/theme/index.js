import PropTypes from 'prop-types';
import { useMemo } from 'react';
// material
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createTheme, StyledEngineProvider } from '@material-ui/core/styles';
//
import shape from './shape';
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import GlobalStyles from './globalStyles';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node
};

export default function ThemeConfig({ children }) {
  // userMemo文档：https://zh-hans.reactjs.org/docs/hooks-reference.html#usememo
  // 关于userMemo的文章：https://www.jianshu.com/p/94ace269414d
  // 会在渲染期间执行
  const themeOptions = useMemo(
    () => ({
      palette,
      shape,
      typography,
      breakpoints,
      shadows,
      customShadows
    }),
    []
  );
  // 根据上面的主题选项构造主题
  // API地址 https://material-ui.com/zh/customization/theming/#api
  //  使用ThemeProvider
  //  将自定义的主题传进来：https://material-ui.com/zh/customization/theming/#theme-provider
  // StyleEngineProvider是用来使用自己自定义的CSS来覆盖Material-ui的样式
  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
