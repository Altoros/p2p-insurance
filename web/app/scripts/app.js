angular.module('app', ['ui.router',
                       'ui.bootstrap',
                       'ui-notification',
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

})
.config(function(NotificationProvider) {
    NotificationProvider.setOptions({
        delay: 5000,
        startTop: 20,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'right',
        positionY: 'top'
    });
});
