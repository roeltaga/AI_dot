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
    function getBest() {
        for (o=0; o<gen0.length; o++){
            onlyDistances.push(gen0[o].distance);
        }

        let closest = Math.min(...onlyDistances);
        bestObj = gen0[onlyDistances.indexOf(closest)];

        console.log(bestObj);
        document.getElementById("theBest").innerHTML = bestObj.moves + "<br> moves left: " + bestObj.distance;
    }

    

    // REPEAT BEST MOVES
    let step = 0;
    function repeatBest(moves){
        // for(i=0; i<moves.length; i++){

        //     // setTimeout( function(){move(moves.charAt(i));}, 1000 );

        //     move(moves.charAt(i));
        //     console.log("Best movies replied - " + moves);
        // }
        
        // dumb.style.top = latestPosition[0];     // Ressest position
        // dumb.style.left = latestPosition[1];

        // move(moves.charAt(i));

        // move(moves[step]);
        // setTimeout( function(){move(moves[step]);}, 1000 );

        // setTimeout(function() {
        //     console.log("asdasd " + step);
        // }, 1000);

        // step++;

        // if (step < moves.length) {
        //     repeatBest(moves);
        // }
        // else {

        // }



        let howManyTimes = bestObj.moves.lenth;
        move(bestObj.moves[step]);
        step++;
        
        if( step < howManyTimes ){
            setTimeout( repeatBest(bestObj.moves), 100 );
        }



    }




    



    // EVENTS *****
    
    document.getElementById("run").addEventListener("click", runSteps);
    
    document.getElementById("getBest").addEventListener("click", getBest);
    
    document.getElementById("runGen").addEventListener("click", runGen);
    
    document.getElementById("repeatBest").addEventListener("click", function(){ repeatBest(bestObj.moves)});








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
