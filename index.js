module.exports = function gnar(api_key, requested_region) {
  var request = require('request')
  
    , key = api_key
    , region = requested_region

    , api = {
        champion: region + '/v1.2/champion/',
        game: region + '/v1.3/game/',
        league: region + '/v2.5/league/',
        lol_static_data: 'static-data/' + region + '/v1.2/',
        match: region + '/v2.2/match/',
        matchhistory: region + '/v2.2/matchhistory/',
        stats: region + '/v1.3/stats/',
        summoner: region + '/v1.4/summoner/',
        team: region + '/v2.4/team/'
      }
  
    , exports = {};

  function url(endpoint) {
    return 'https://' + region + '.api.pvp.net/api/lol/' + endpoint + '?api_key=' + key;
  }

  function get(endpoint) {
    return request(url(endpoint));
  }

  function str(ids) {
    return (typeof ids !== 'string') ? ids.join(',') : ids;
  }

  exports.champion = {
    all: function() { return get(api.champion); },
    by_id: function(id) { return get(api.champion + id); }
  };

  exports.game = {
    by_summoner: function(id) { return get(api.game + 'by-summoner/' + id + '/recent'); }
  };

  exports.league = {
    by_summoner: function(ids) { return get(api.league + 'by-summoner/' + str(ids)); },
    by_team: function(ids) { return get(api.league + 'by-team/' + str(ids)); },
    challenger: function() { return get(api.league + 'challenger'); },
    entries: {
      by_summoner: function(ids) { return get(api.league + 'by-summoner/' + str(ids) + '/entry'); },
      by_team: function(ids) { return get(api.league + 'by-team/' + str(ids) + '/entry'); }
    }
  };

  exports.lol_static_data = {
    champion: {
      all: function() { return get(api.lol_static_data + 'champion'); },
      by_id: function(id) { return get(api.lol_static_data + 'champion/' + id); }
    },
    item: {
      all: function() { return get(api.lol_static_data + 'item'); },
      by_id: function(id) { return get(api.lol_static_data + 'item/' + id); }
    },
    mastery: {
      all: function() { return get(api.lol_static_data + 'mastery'); },
      by_id: function(id) { return get(api.lol_static_data + 'mastery/' + id); }
    },
    realm: function() { return get(api.lol_static_data + 'realm'); },
    rune: {
      all: function() { return get(api.lol_static_data + 'rune'); },
      by_id: function(id) { return get(api.lol_static_data + 'rune/' + id); }
    },
    summoner_spell: {
      all: function() { return get(api.lol_static_data + 'summoner-spell'); },
      by_id: function(id) { return get(api.lol_static_data + 'summoner-spell/' + id); }
    },
    versions: function() { return get(api.lol_static_data + 'versions'); }
  };

  exports.match = function(id) { return get(api.match + id); };

  exports.matchhistory = function(id) { return get(api.matchhistory + id); };

  exports.stats = {
    ranked: function(id) { return get(api.stats + 'by-summoner/' + id + '/ranked'); },
    summary: function(id) { return get(api.stats + 'by-summoner/' + id + '/summary'); }
  };

  exports.summoner = {
    by_name: function(names) { return get(api.summoner + 'by-name/' + str(names)); },
    by_id: function(ids) { return get(api.summoner + str(ids)); },
    masteries: function(ids) { return get(api.summoner + str(ids) + '/masteries'); },
    name: function(ids) { return get(api.summoner + str(ids) + '/name'); },
    runes: function(ids) { return get(api.summoner + str(ids) + '/runes'); }
  };

  exports.team = {
    by_team: function(ids) { return get(api.team + str(ids)); },
    by_summoner: function(ids) { return get(api.team + 'by-summoner/' + str(ids)); }
  };
  
  exports.configuration = {
    setKey: function(k) { key = k; },
    setRegion: function(r) { region = r; }
  };
  
  return exports;
};