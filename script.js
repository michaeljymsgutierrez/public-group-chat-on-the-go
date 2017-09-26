'use strict';

/*
    Main Script Cycle
*/
function scriptCycle() {
    $(document).ready(function() {
        /*
            Auto send data on enter
        */
        $('#msg').keydown(function(event) {
            if (event.keyCode == 13) {
                $('#send').trigger('click');
            }
        });

        /*
            Desktop Notification
        */
        setInterval(function() {
            Notification.requestPermission();
            var user = $('#user').val();
            try {
                var mention = JSON.parse(window.localStorage.getItem('mention'));
            } catch (err) {};
            if (mention) {
                if (Notification.permission == "granted" && mention.msg.search('@' + user) != -1 && mention.is_mentioned == 0) {
                    var notification = new Notification('CG-Public-Group-Chat', {
                        icon: 'js.png',
                        body: "Hey there someone mentioned you " + user,
                    });
                    window.localStorage.removeItem('mention');
                }
            }
        }, 1000);

    });
};

scriptCycle();