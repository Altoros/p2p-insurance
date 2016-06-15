angular.module('app', ['ui.router',
                       'ui.bootstrap',
                       'ui-notification',
                       'timeService',
                       'userService',
                       'peerService',
                       'demoController',
                       'oraclesController',
                       'oraclesPaymentController',
                       'oraclesClaimController',
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
  .state('oracles', {
    url: '/oracles',
    templateUrl: 'partials/oracles.html',
    controller: 'OraclesController as ctl'
  })
  .state('oracles.payment', {
    url: '/oracles-payment',
    templateUrl: 'partials/oracles.payment.html',
    controller: 'OraclesPaymentController as paymentCtrl'
  })
  .state('oracles.claim', {
    url: '/oracles-claim',
    templateUrl: 'partials/oracles.claim.html',
    controller: 'OraclesClaimController as claimCtrl'
  });
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
