/**
 * @class PeerService
 * @classdesc
 * @ngInject
 */
function PeerService(cfg, UserService) {
  // jshint shadow: true
  var PeerService = this;

  PeerService.getPools = function () {
    return cfg.pools;
  };
  PeerService.enterPool = function (pool) {
    pool.members.push(UserService.getUser().id);
  };
  PeerService.createPool = function (pool) {
    var countPools = cfg.pools.length;
    pool.members = [];
    pool.insures = [];
    pool.members.push(UserService.getUser().id);
    pool.id = 'pool' + (countPools + 1);
    cfg.pools.push(pool);
    cfg.triggers.push(pool.trigger);
  };
  PeerService.insurePool = function (new_pool, insureId) {
    return _.forEach(cfg.pools, function (pool) {
      if (pool.id === new_pool.id) {
        pool.insures.push(insureId);
        pool.insurePremium += new_pool.insurePremium;
      }
    });
  };

}

angular.module('peerService', []).service('PeerService', PeerService);
