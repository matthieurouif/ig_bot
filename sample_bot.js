Instagram = require('instagram-node-lib');

Instagram.set('client_id', 'CLIENT_ID');
Instagram.set('client_secret', 'CLIENT_SECRET');

//url to get the token https://api.instagram.com/oauth/authorize/?client_id=CLIENT_ID&redirect_uri=REDIRECT_URL/&response_type=token&scope=likes+comments+relationships
Instagram.set('access_token','ACCESS_TOKEN');

var global_since_id = 0;
refresh = function() {

  Instagram.tags.recent({
      name: 'questionoftheday',
      complete: function(data)
      { 
        var local_since_id = 0;
        for(var i = 0; i < data.length; i ++) 
        {
          var media = data[i];
        if (global_since_id < media.created_time )
        {
            Instagram.media.like({ media_id: media.id });
            Instagram.users.follow({ user_id: media.user.id });
            var comment = '@' + media.user.username + 'Ahoy fellow instgramer';
            Instagram.media.comment({ media_id: media.id, text: comment });
            since_id = media.created_time;
            if (local_since_id < media.created_time )
            {
              local_since_id = media.created_time;
            }
        }
      }
      global_since_id = global_since_id;
      setTimeout(refresh, 18000000); 
    }
    })
};

refresh();

