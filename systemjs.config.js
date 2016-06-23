/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {

  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',

    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs',

    //3rd libs
    'underscore':                 'node_modules/underscore',
    'angular2-jwt':               'node_modules/angular2-jwt',

    // for barrels
    'shared':                     'app/shared',
    'chat-container':             'app/chat-container',
    'chat-threads':               'app/chat-container/chat-threads',
    'chat-window':                'app/chat-container/chat-window',
    'login':             'app/login'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },

    //3rd libs
    'underscore':                 { main: 'underscore.js', defaultExtension: 'js'},
    'angular2-jwt':                 { main: 'angular2-jwt.js', defaultExtension: 'js'},

    // for barrels
    'shared':                     { main: 'index.js',  defaultExtension: 'js' },
    'chat-container':                     { main: 'index.js',  defaultExtension: 'js' },
    'chat-threads':                     { main: 'index.js',  defaultExtension: 'js' },
    'chat-window':                     { main: 'index.js',  defaultExtension: 'js' },
    'window':                     { main: 'index.js',  defaultExtension: 'js' },
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }

  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  // No umd for router yet
  packages['@angular/router'] = { main: 'index.js', defaultExtension: 'js' };

  var config = {
    map: map,
    packages: packages
  };

  System.config(config);

})(this);