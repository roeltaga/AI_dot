window.onload = function() {


    //Declare a billion variables here LOL

    // INPUT variables

    const dumb = document.getElementById("dumb");

    const destination = document.getElementById("destination");

    const moves = ["w","d","s","a"];




    // OUTPUT variables

    let gen1 = []; //store moves of 
    //gen1.push("$movesOf1stDot");





    // All functions() here...

    let temp = "";

    function move(direction) {
        if (direction == "w") {
            newPos = parseInt(dumb.style.top) - 10;
            dumb.style.top = newPos;
        }
        if (direction == "d") {
            newPos = parseInt(dumb.style.left) + 10;
            dumb.style.left = newPos;
        }
        if (direction == "s") {
            newPos = parseInt(dumb.style.top) + 10;
            dumb.style.top = newPos;
        }
        if (direction == "a") {
            newPos = parseInt(dumb.style.left) - 10;
            dumb.style.left = newPos;
        }

        
        temp = temp + direction;
        console.log(temp);
    }



    
    function randomMove() {
        var direction = moves[Math.floor(Math.random() * 4)]; // chose w/d/s/a randmoly
        move(direction);
    }



    // function runSteps() {    // Without delay
    //     for(x=1; x <= document.getElementById("timesToRun").value; x++ ){
    //         setTimeout(function(){randomMove();}, 2000);
    //         console.log("nr " + x);
    //     }
    // }

    let stepNr = 0;  
    function runSteps() {       //delayed moves
        let howManyTimes = document.getElementById("timesToRun").value;
        randomMove();
        stepNr++;
        if( stepNr < howManyTimes ){
            setTimeout( runSteps, 70 );
        }
        else {
            
            console.log(gen1);
            console.log("added to gen1: " + temp);
            gen1.push(temp);
            console.log(gen1);
            temp = "";

            stepNr = 0;
        }
    }


    



    // EVENTS *****
    
    document.getElementById("run").addEventListener("click", runSteps);








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
        if (key == 32) {        // space - start learning
            e.preventDefault(); 
            randomMove();
        }
    }



}