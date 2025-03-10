var lastfmData = {
  baseURL:
    "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=",
  // Your Last.fm Username
  user: "vacrtino",
  // Your API key
  api_key: "2db0871c177a97e3587677c970b45246",
  additional: "&format=json&limit=1"
};

var getSetLastFM = function() {
  $.ajax({
    type: "GET",
    url:
      lastfmData.baseURL +
      lastfmData.user +
      "&api_key=" +
      lastfmData.api_key +
      lastfmData.additional,
    dataType: "json",
    success: function(resp) {
      var recentTrack = resp.recenttracks.track[0];
      var formatted = recentTrack.name;
      $("a#tracktitle")
        .html(formatted)
        .attr("href", recentTrack.url)
        .attr("title", recentTrack.name + " by " + recentTrack.artist["#text"])
        .attr("target", "_blank");

      var artistFormatted =
        recentTrack.artist["#text"];
      $("a#trackartist")
        .html(artistFormatted)
        // .attr("href", "https://last.fm/music/" + recentTrack.artist["#text"])
        .attr("title", "Artist : " + recentTrack.artist["#text"])
        .attr("target", "_blank");
      $("img#trackart").attr("src", recentTrack.image[2]["#text"]);
    },
    error: function(resp) {
      $("a#tracktitle").html(
        "<img src='https://i.imgur.com/XUhRVmz.png'>" + "Silence!"
      );
      $("img#trackart").attr("src", "https://i.imgur.com/Q6cCswP.jpg");
      var artistFormatted =
        "<img src='https://i.imgur.com/fae5XZA.png'>Prashant Shrestha";
      $("a#trackartist")
        .html(artistFormatted)
        .attr("href", "www.prashant.me/");
    }
  });
};

// Get the new one.
getSetLastFM();
// Start the countdown.
setInterval(getSetLastFM, 10 * 1000);
