import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';


export default defineConfig({
  source: {
    entry: {
      index: ['./src/**'],
    },
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: 'esm',
    },
  ],
  output: {
    target: 'web',
    minify: false,
    externals: {
      'react': 'react',
      'react-dom': 'react-dom',
      '@emotion/react': '@emotion/react',
      '@emotion/styled': '@emotion/styled',
      '@mui/material': '@mui/material',
      '@mui/icons-material': '@mui/icons-material',
      '@mui/system': '@mui/system',
      '@mui/x-date-pickers': '@mui/x-date-pickers',
      '@yudiel/react-qr-scanner': '@yudiel/react-qr-scanner',
      'axios': 'axios',
      'dayjs': 'dayjs',
      'formik': 'formik',
      'i18next': 'i18next',
      'is-mobile': 'is-mobile',
      'notistack': 'notistack',
      'react-i18next': 'react-i18next',
      'react-number-format': 'react-number-format',
      'jotai': 'jotai',
      'yup': 'yup',
    }
  },


  plugins: [
    pluginReact(),
    pluginBabel({
      include: /\.[jt]sx?$/,
      exclude: [/[\\/]node_modules[\\/]/],
      babelLoaderOptions(opts) {
        opts.plugins ??= [];
      },
    }),
  ],
});
