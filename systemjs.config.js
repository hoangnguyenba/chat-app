/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {

  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',

    '@angular':                   'node_modules/@angular',
    'rxjs':                       'node_modules/rxjs',

    //3rd libs
    'moment':                     'node_modules/moment',
    'ng2-bootstrap':              'node_modules/ng2-bootstrap',
    'underscore':                 'node_modules/underscore',
    'angular2-jwt':               'node_modules/angular2-jwt',
    'ng2-toastr':                 'node_modules/ng2-toastr',
    // 'ng2-notifications':          'node_modules/ng2-notifications',

    // for barrels
    'shared':                     'app/shared',
    '+chat':                      'app/+admin/+chat',
    '+chat-threads':              'app/+admin/+chat/+chat-threads',
    '+chat-window':               'app/+admin/+chat/+chat-window',
    '+login':                     'app/+login'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    

    //3rd libs
    'moment':                 { main: 'moment.js', defaultExtension: 'js'},
    'ng2-bootstrap':                 { main: 'ng2-bootstrap.js', defaultExtension: 'js'},
    'underscore':                 { main: 'underscore.js', defaultExtension: 'js'},
    'angular2-jwt':                 { main: 'angular2-jwt.js', defaultExtension: 'js'},
    'ng2-toastr':              { main: 'ng2-toastr.js', defaultExtension: 'js' },
    // 'ng2-notifications':              { main: 'ng2-notifications.js', defaultExtension: 'js' },

    // for barrels
    'shared':                     { main: 'index.js',  defaultExtension: 'js' },
    '+chat-container':                     { main: 'index.js',  defaultExtension: 'js' },
    '+chat-threads':                     { main: 'index.js',  defaultExtension: 'js' },
    '+chat-window':                     { main: 'index.js',  defaultExtension: 'js' },
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