'use strict';

function scriptCycle() {
    $(document).ready(function() {
        $('#msg').keydown(function(event) {
            if (event.keyCode == 13) {
                $('#send').trigger('click');
            }
        });
    });
}

scriptCycle();