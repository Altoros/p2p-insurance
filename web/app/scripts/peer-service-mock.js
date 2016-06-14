/**
 * @class PeerService
 * @classdesc
 * @ngInject
 */
function PeerService(cfg, UserService) {
  // jshint shadow: true
  var PeerService = this;

  this.getPools = function () {
    return cfg.pools;
  };

}

angular.module('peerService', []).service('PeerService', PeerService);
