import { theme as chakraTheme } from '@chakra-ui/core';

//Chakra UI默认主题，其中包含颜色、排版等的值。可扩展默认字体并添加自定义字体。
const theme = {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 800
  }
};

export default theme;
