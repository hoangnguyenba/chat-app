import { join } from 'path';

import { SeedConfig } from './seed.config';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
  FONTS_DEST = `${this.APP_DEST}/fonts`;
  FONTS_SRC = [
      // 'node_modules/bootstrap/dist/fonts/**',
      'node_modules/font-awesome/fonts/**'
  ];
  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      {src: 'bootstrap/dist/css/bootstrap.min.css', inject: true},
      {src: 'font-awesome/css/font-awesome.css', inject: true},
      {src: 'ng2-toastr/bundles/ng2-toastr.min.css', inject: true},
      {src: 'socket.io-client/socket.io.js', inject: 'libs'}
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      { src: `${this.CSS_SRC}/AdminLTE.${ this.getInjectableStyleExtension() }`, inject: true, vendor: false },
      { src: `${this.CSS_SRC}/skins/skin-blue.${ this.getInjectableStyleExtension() }`, inject: true, vendor: false },
      { src: `${this.CSS_SRC}/dataTables.bootstrap.${ this.getInjectableStyleExtension() }`, inject: true, vendor: false }
    ];

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });



    // this.SYSTEM_CONFIG_DEV.paths['angular2-jwt'] =
    //   `${this.APP_BASE}dist/${this.ENV}/app/shared/angular2-jwt.service`;

    // this.SYSTEM_BUILDER_CONFIG.packages['angular2-jwt'] = {
    //     main: 'angular2-jwt.service.js',
    //     defaultExtension : 'js'
    // };

    this.SYSTEM_CONFIG_DEV.paths['underscore'] =
      `${this.APP_BASE}node_modules/underscore/underscore`;

    this.SYSTEM_BUILDER_CONFIG.packages['underscore'] = {
        main: 'underscore.js',
        defaultExtension : 'js'
    };
  }

}
