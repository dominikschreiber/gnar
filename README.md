# gnar

A wrapper for the official [League of Legends API](https://developer.riotgames.com).

## Getting Started

1. obtain an API key from https://developer.riotgames.com by logging in with your League of Legends Account

2. install *gnar* as npm module (use `--save` to persist this to your package.json)

  ```bash
  npm install gnar
  ```

3. require *gnar* in your app

  ```javascript
  var gnar = require('gnar')('<your-api-key>', '<your region>');
  // you can change api-key and region later with
  //   gnar.configuration.setKey('<new-key>') and
  //   gnar.configuration.setRegion('<new-region>')
  ```

4. use *gnar* as you would expect

  ```javascript
  gnar.summoner.by_name('refridgerator').pipe(process.stdout)
  // all stream-based! pipe to what you need
  ```

5. as API requests are limited (to 10 per 10s, 500 per 10min by default) you may want to cache your results like

  ```javascript
  var cache = require('stream-cache'), fs = require('fs');
  // easiest way to cache (not fastest!): write to file system
  gnar.lol_static_data.champion.all().pipe(fs.createWriteStream('cache/champion.json'));
  // then retrieve it again
  var champion = fs.createReadStream('cache/champion.json');
  ```

## API documentation

As this is a pure wrapper for the League of Legends API, please refer the [full documentation](https://developer.riotgames.com/api/methods) for details on the API endpoints.

Method parameters (like `id`, `summonerId`) are parsed to strings (automatically by JavaScript) and inserted into the request url. Where the League of Legends API allows multiple entries (where the parameter is in plural, like `summonerIds`, `teamIds`) you can either pass a string (which is directly inserted into the url) or an array (that will be joined with `,`s).

### champion
- `gnar.champion.all()` maps to [/api/lol/{region}/v1.2/champion](https://developer.riotgames.com/api/methods#!/776/2763)
- `gnar.champion.by_id(id)` maps to [/api/lol/{region}/v1.2/champion/{id}](https://developer.riotgames.com/api/methods#!/776/2762)

### game
- `gnar.game.by_summoner(summonerId)` maps to [/api/lol/{region}/v1.3/game/by-summoner/{summonerId}/recent](https://developer.riotgames.com/api/methods#!/777/2764)

### league
- `gnar.league.by_summoner(summonerIds)` maps to [/api/lol/{region}/v2.5/league/by-summoner/{summonerIds}](https://developer.riotgames.com/api/methods#!/808/2854)
- `gnar.league.entries.by_summoner(summonerIds)` maps to [/api/lol/{region}/v2.5/league/by-summoner/{summonerIds}/entry](https://developer.riotgames.com/api/methods#!/808/2858)
- `gnar.league.by_team(teamIds)` maps to [/api/lol/{region}/v2.5/league/by-team/{teamIds}](https://developer.riotgames.com/api/methods#!/808/2855)
- `gnar.league.entries.by_team(teamIds)` maps to [/api/lol/{region}/v2.5/league/by-team/{teamIds}/entry](https://developer.riotgames.com/api/methods#!/808/2857)
- `gnar.league.challenger()` maps to [/api/lol/{region}/v2.5/league/challenger](https://developer.riotgames.com/api/methods#!/808/2856)

### lol_static_data
- `gnar.lol_static_data.champion.all()` maps to [/api/lol/static-data/{region}/v1.2/champion](https://developer.riotgames.com/api/methods#!/821/2895)
- `gnar.lol_static_data.champion.by_id(id)` maps to [/api/lol/static-data/{region}/v1.2/champion/{id}](https://developer.riotgames.com/api/methods#!/821/2892)
- `gnar.lol_static_data.item.all()` maps to [/api/lol/static-data/{region}/v1.2/item](https://developer.riotgames.com/api/methods#!/821/2889)
- `gnar.lol_static_data.item.by_id(id)` maps to [/api/lol/static-data/{region}/v1.2/item/{id}](https://developer.riotgames.com/api/methods#!/821/2900)
- `gnar.lol_static_data.mastery.all()` maps to [/api/lol/static-data/{region}/v1.2/mastery](https://developer.riotgames.com/api/methods#!/821/2897)
- `gnar.lol_static_data.mastery.by_id(id)` maps to [/api/lol/static-data/{region}/v1.2/mastery/{id}](https://developer.riotgames.com/api/methods#!/821/2899)
- `gnar.lol_static_data.realm()` maps to [/api/lol/static-data/{region}/v1.2/realm](https://developer.riotgames.com/api/methods#!/821/2894)
- `gnar.lol_static_data.rune.all()` maps to [/api/lol/static-data/{region}/v1.2/rune](https://developer.riotgames.com/api/methods#!/821/2896)
- `gnar.lol_static_data.rune.by_id(id)` maps to [/api/lol/static-data/{region}/v1.2/rune/{id}](https://developer.riotgames.com/api/methods#!/821/2891)
- `gnar.lol_static_data.summoner_spell.all()` maps to [/api/lol/static-data/{region}/v1.2/summoner-spell](https://developer.riotgames.com/api/methods#!/821/2898)
- `gnar.lol_static_data.summoner_spell.by_id(id)` maps to [/api/lol/static-data/{region}/v1.2/summoner-spell/{id}](https://developer.riotgames.com/api/methods#!/821/2890)
- `gnar.lol_static_data.versions()` maps to [/api/lol/static-data/{region}/v1.2/versions](https://developer.riotgames.com/api/methods#!/821/2893)

### match
- `gnar.match(matchId)` maps to [/api/lol/{region}/v2.2/match/{matchId}](https://developer.riotgames.com/api/methods#!/826/2913)

### matchhistory
- `gnar.matchhistory(summonerId)` maps to [/api/lol/{region}/v2.2/matchhistory/{summonerId}](https://developer.riotgames.com/api/methods#!/825/2912)

### stats
- `gnar.stats.ranked(summonerId)` maps to [/api/lol/{region}/v1.3/stats/by-summoner/{summonerId}/ranked](https://developer.riotgames.com/api/methods#!/779/2770)
- `gnar.stats.summary(summonerId)` maps to [/api/lol/{region}/v1.3/stats/by-summoner/{summonerId}/summary](https://developer.riotgames.com/api/methods#!/779/2771)

### summoner
- `gnar.summoner.by_name(summonerNames)` maps to [/api/lol/{region}/v1.4/summoner/by-name/{summonerNames}](https://developer.riotgames.com/api/methods#!/778/2765)
- `gnar.summoner.by_id(summonerIds)` maps to [/api/lol/{region}/v1.4/summoner/{summonerIds}](https://developer.riotgames.com/api/methods#!/778/2766)
- `gnar.summoner.masteries(summonerIds)` maps to [/api/lol/{region}/v1.4/summoner/{summonerIds}/masteries](https://developer.riotgames.com/api/methods#!/778/2768)
- `gnar.summoner.name(summonerIds)` maps to [/api/lol/{region}/v1.4/summoner/{summonerIds}/name](https://developer.riotgames.com/api/methods#!/778/2769)
- `gnar.summoner.runes(summonerIds)` maps to [/api/lol/{region}/v1.4/summoner/{summonerIds}/runes](https://developer.riotgames.com/api/methods#!/778/2767)

### team
- `gnar.team.by_summoner(summonerIds)` maps to [/api/lol/{region}/v2.4/team/by-summoner/{summonerIds}](https://developer.riotgames.com/api/methods#!/810/2862)
- `gnar.team.by_team(teamIds)` maps to [/api/lol/{region}/v2.4/team/{teamIds}](https://developer.riotgames.com/api/methods#!/810/2861)

## License
The MIT License (MIT)

Copyright (c) 2014 Dominik Schreiber

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
