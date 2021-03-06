/**
 * @class DemoController
 * @classdesc
 * @ngInject
 */
function DemoController($log, $q, $interval, $timeout, $state,
    cfg, TimeService, UserService, PeerService) {

  var ctl = this;

  ctl.now = function() {
    return TimeService.now;
  };

  ctl.tick = function() {
    TimeService.tick();
  };

  ctl.clock = function() {
    TimeService.clock();
  };

  ctl.user = UserService.getUser();

  ctl.users = UserService.getUsers();

  ctl.setUser = function(u) {
    UserService.setUser(u);
    $state.reload();
  };

}

angular.module('demoController', [])
.controller('DemoController', DemoController);
