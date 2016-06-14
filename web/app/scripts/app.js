angular.module('app', ['ui.router',
                       'ui.bootstrap',
                       'timeService',
                       'userService',
                       'peerService',
                       'demoController',
                       'config'])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('demo', {
    url: '/',
    templateUrl: 'partials/demo.html',
    controller: 'DemoController as ctl'
  })
  .state('demo.pool-list', {
    url: 'pool-list',
    templateUrl: 'partials/pool-list.html',
    controller: 'PoolListController as poolList'
  })

});
