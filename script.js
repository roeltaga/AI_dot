window.onload = function() {


    //Declare a billion variables here LOL

    let dumb = this.document.getElementById("dumb");







    // All functions() here...

    function move(x) {
        if (x == "w") {
            newX = parseInt(dumb.style.top) - 10;
            dumb.style.top = newX;
        }

        if (x == "d") {
            newX = parseInt(dumb.style.left) + 10;
            dumb.style.left = newX;
        }

        if (x == "s") {
            newX = parseInt(dumb.style.top) + 10;
            dumb.style.top = newX;
        }

        if (x == "a") {
            newX = parseInt(dumb.style.left) - 10;
            dumb.style.left = newX;
        }




    }













        //KEYBOARD Events - temporary

        window.onkeydown = function(e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key == 87) {        // W
                e.preventDefault(); 
                move("w");
            }
            if (key == 68) {        // D
                e.preventDefault(); 
                move("d");
            }
            if (key == 83) {        // S
                e.preventDefault(); 
                move("s");
            }
            if (key == 65) {        // A
                e.preventDefault(); 
                move("a");
            }
         }













}