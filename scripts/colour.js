require([
  '$api/models',
  '$api/search#Search',
  '$views/image#Image',
  '$api/models#Playlist'
], function(models, Search, Image, Playlist) {
  'use strict';

  var init = function() {
    var radioList = document.querySelectorAll('input[name="colour"]');

    for (var i=0; i<radioList.length; i++) {
      radioList[i].addEventListener('click', radio_clickHandler);
    }

    searchForColour('red');
  };

  var radio_clickHandler = function(event) {
    var colourValue = document.querySelector('input[name="colour"]:checked').value;
    searchForColour(colourValue);
  };

  var searchForColour = function (colour) {
    var searchCollection = Search.search('track:"' + colour + '"').tracks;//.snapshot(0, 10);
    searchCollection = searchCollection.sort('popularity', 'desc');
    applySearchToArtistUI(searchCollection);
  };

  var applySearchToArtistUI = function(collection) {
    var artistList = document.querySelector('#artistList');
    artistList.innerHTML = '';
    collection.snapshot(0,3)
      .done(function(snapshot) {
        Playlist.createTemporary('colourful-music-playlist')
          .done(function(playlist) {
            return playlist.load('tracks');
          })
          .done(function(loadedPlaylist) {
            return loadedPlaylist.tracks.snapshot;
          })
          .done(function(playlistSnapshot) {
              return playlistSnapshot.tracks.add(snapshot.toArray());
          })
          .done(function(updatedPlaylist) {
            snapshot.loadAll('name', 'artists', 'image').each(function(track) {
              track.artists[0].load('name','popularity','biography','image','portraits','genres')
                .done(function(loadedArtist) {
                  var trackLI = document.createElement('li');

    //              var trackImage = Image.forArtist(loadedArtist, {style: 'plain', player: 'true'});
                  var trackImage = Image.forTrack(track, {style: 'plain', player: 'true'});
                  trackLI.appendChild(trackImage.node);

                  var artistDetails = document.createElement('div');
                  var artistHTML = '';
                  artistHTML += track.name ? '<div class="track">' + track.name.decodeForHtml() + '</div>' : '';
                  artistHTML += loadedArtist.name ? '<div class="artist"><a href="' + loadedArtist.uri.decodeForText() + '">' + loadedArtist.name.decodeForHtml() + '</a></div>'  : '';
                  artistDetails.innerHTML = artistHTML;
                  trackLI.appendChild(artistDetails);

                  artistList.appendChild(trackLI);
                });
            });
          });
      });
  };

  var onSessionOnlineChange = function(obj) {
    applyOnlineOffline(obj.target.online);
  };

  var applyOnlineOffline = function(onlineStatus) {
    if(onlineStatus) {
        document.querySelector('#container').style.display = 'block';
        document.querySelector('#offline').style.display = 'none';
      } else {
        document.querySelector('#offline').style.display = 'block';
        document.querySelector('#container').style.display = 'none';
      }
  };

  var storedSession = new models.Session().load("online")
  .done(function(loadedSession) {
    loadedSession.addEventListener('change:online', onSessionOnlineChange);
    applyOnlineOffline(loadedSession.online);

    return loadedSession;
  });

  exports.init = init;
});