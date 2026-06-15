import * as path from 'node:path';
import { defineConfig } from '@rspress/core';
import { pluginApiDocgen } from '@rspress/plugin-api-docgen';
import { pluginPreview } from '@rspress/plugin-preview';
import { pluginWorkspaceDev } from 'rsbuild-plugin-workspace-dev';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'generic-form',
  lang: 'es',
  builderConfig: {
    plugins: [
      pluginWorkspaceDev({
        startCurrent: true,
      }),
    ],
  },
  plugins: [

    pluginPreview(),
  ],

  themeConfig: {
    sidebar: {
      '/': [
        { text: 'GenericForm', link: '/generic-form' },
        { text: 'useModalState', link: '/use-modal-state' },
        { text: 'LanguageProvider', link: '/language-provider' },
        { text: 'Notifications', link: '/notifications' }
      ]
    }
  }
});
