window.onload = function() {



    //Declare a billion variables here LOL

    // INPUT variables

    const dumb = document.getElementById("dumb");

    const destination = document.getElementById("destination");

    const moves = ["w","d","s","a"];



    // OUTPUT variables

    let gen0 = []; //store moves of 
    
    let latestPosition = [270, 20];



    // All functions() here...

    let temp = "";

    // MOVE
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
        // console.log(temp);
    }



    // RANDOM MOVE
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

    // RUN STEPS
    let stepNr = 0;
    function runSteps() {       //delayed moves
        let howManyTimes = document.getElementById("timesToRun").value;
        randomMove();
        stepNr++;
        if( stepNr < howManyTimes ){
            setTimeout( runSteps, 0 );
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
            console.log("added to gen0: " + obj0.moves + " at " + obj0.distance);

            dumb.style.top = latestPosition[0];
            dumb.style.left = latestPosition[1];
            
            temp = "";
            stepNr = 0;
        }
    }



    // RUN GENERATION
    let genPop = 0;  //generation population
    function runGen() {
        let howManyTimes = document.getElementById("population").value;
        runSteps();
        genPop++;
        if( genPop < howManyTimes ){
            setTimeout( runGen, 0 );
        }
        else {
            getBest();
            genPop = 0;
        }
    }



    // GET BEST
    let onlyDistances = [];
    let bestObj = {};
    let eachGenBest = [];
    function getBest() {
        for (o=0; o<gen0.length; o++){
            onlyDistances.push(gen0[o].distance);
        }

        let closest = Math.min(...onlyDistances);
        bestObj = gen0[onlyDistances.indexOf(closest)];

        console.log(bestObj);
        document.getElementById("theBest").innerHTML = bestObj.moves + "<br> moves left: " + bestObj.distance;

        eachGenBest.push(bestObj.moves);
        console.log(eachGenBest);



        // console.log("4 " + onlyDistances);
        // console.log("4 " + gen0[0].moves);
        // console.log("4 " + eachGenBest);



        onlyDistances = []; 
        gen0 = []; //reset
    }

    

    // REPEAT BEST MOVES
    let step = 0;
    function repeatBest() {

        let howManyTimes = bestObj.moves.length;
        move(bestObj.moves[step]);
        step++;

        console.log("4 " + bestObj.moves);
        
        if( step < howManyTimes ){
            setTimeout( repeatBest, 300 );
        }
        else {
            let checkpoint0 = document.createElement("div");
            checkpoint0.setAttribute("id", "checkpoint0");
            checkpoint0.setAttribute("class", "checkpoint");
            checkpoint0.setAttribute("style", dumb.style.cssText);
            document.getElementById("scene").appendChild(checkpoint0);
            latestPosition[0] = dumb.style.top;
            latestPosition[1] = dumb.style.left;
        }

    }



    // RUN NEXT GEN

    function runNextGen() {
        let delay = bestObj.moves.length * 300;

        repeatBest();

        setTimeout( function() {
            console.log("HELP ME")
        }, delay);

        setTimeout( runGen, delay);

    }




    



    // EVENTS *****
    
    document.getElementById("run").addEventListener("click", runSteps);
    
    document.getElementById("getBest").addEventListener("click", getBest);
    
    document.getElementById("runGen").addEventListener("click", runGen);
    
    document.getElementById("runNextGen").addEventListener("click", runNextGen);
    
    document.getElementById("repeatBest").addEventListener("click", repeatBest);








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
