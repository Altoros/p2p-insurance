/**
 * @class PeerService
 * @classdesc
 * @ngInject
 */
function PeerService(cfg, UserService) {
  // jshint shadow: true
  var PeerService = this;

  PeerService.getPools = function () {
    return getLS('pools') || cfg.pools;
  };
  PeerService.enterPool = function (pool) {
    pool.members.push(UserService.getUser().id);
    saveLS('pools', cfg.pools);
  };
  PeerService.createPool = function (pool) {
    var countPools = cfg.pools.length;
    pool.members = [];
    pool.insures = [];
    pool.members.push(UserService.getUser().id);
    pool.id = 'pool' + (countPools + 1);
    cfg.pools.push(pool);
    cfg.triggers.push(pool.trigger);
    saveLS('pools', cfg.pools);
  };
  PeerService.insurePool = function (new_pool, insureId) {
    _.forEach(cfg.pools, function (pool) {
      if (pool.id === new_pool.id) {
        pool.insures.push(insureId);
        pool.insurePremium += new_pool.insurePremium;
      }
    });
    saveLS('pools', cfg.pools);
    return;
  };

  function getLS(key) {
    var value;
    var lsValue = localStorage.getItem(key)
    if (lsValue) {
      try {
        value = JSON.parse(lsValue);
      } catch (error) {
        console.error(error.stack || error);
      }
    }
    return value;
  }

  function saveLS(key, value) {
    console.log('saving', JSON.stringify(value));
    localStorage.setItem(key, JSON.stringify(value));
  }

}

angular.module('peerService', []).service('PeerService', PeerService);
