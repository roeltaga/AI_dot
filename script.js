window.onload = function() {


    //Declare a billion variables here LOL

    // INPUT variables

    const dumb = document.getElementById("dumb");

    const destination = document.getElementById("destination");

    const moves = ["w","d","s","a"];




    // OUTPUT variables

    let gen0 = []; //store moves of 
    //gen0.push("$movesOf1stDot");





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

        temp += direction;
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

            let xAway = parseInt(destination.style.left) - parseInt(dumb.style.left);
            let yAway = parseInt(destination.style.top) - parseInt(dumb.style.top);
            let xyAway = Math.abs(xAway)/10 + Math.abs(yAway)/10; //How many moves Away from destination
            console.log(xyAway);

            let obj0 = {
                 moves: temp,
                 distance: xyAway,
            }

            gen0.push(obj0);
            console.log("added to gen0: " + obj0);

            // gen0[0].road = temp;
            console.log(gen0[gen0.length -1].distance);

            console.log("out-: " + Math.max(gen0[gen0.length -1].distance));




            temp = "";
            stepNr = 0;
        }
    }

    function getBest() {
        console.log("the best is:  " + Math.min)
        document.getElementById("theBest").innerHTML = gen0[gen0.length-1].moves + " <br> " + gen0[gen0.length-1].distance + " moves left";
    }




    



    // EVENTS *****
    
    document.getElementById("run").addEventListener("click", runSteps);
    
    document.getElementById("getBest").addEventListener("click", getBest);








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






// Extra Comments and Ideas


// If (number of moves done by dumb = distance before - distance after * 10) {
//     keep this dump alive...
// }
