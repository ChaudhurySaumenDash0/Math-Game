var playing= false;
var score;
var action;
var timeremaining;
var correctAnswer;
document.getElementById("startreset").onclick=function(){
    if(playing==true){
        location.reload(); //reload page
    }
    else{ //if we are not playing
        playing=true;
        score=0; //set score to zero
        document.getElementById("scorevalue").innerHTML=score;
        //showing countdownbox
       show("timeremaining");
        timeremaining=60;
        document.getElementById("timeremainingvalue").innerHTML=timeremaining;
        //hide gameoverbox
        hide("gameover");

        //change button to reset
        document.getElementById("startreset").innerHTML="Reset Game";
        //start countdown

        startCountdown();
        //generate a new Q & A
        generateQA();
    }
}
for(i=1;i<5;i++){
    //clicking on an answer box
document.getElementById("option"+i).onclick=function() {
    //check if we are playing
    if(playing==true){
        if(this.innerHTML==correctAnswer){
            score++;
            document.getElementById("scorevalue").innerHTML=score;
            //hide wrong box and show correct
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");
            },1000);
            //Generate new Q & A
            generateQA();
        }
        else{
            //wrong answer
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");
            },1000);
        }
    }
}
}

function startCountdown(){
    action=setInterval(function(){
        timeremaining-=1;
        document.getElementById("timeremainingvalue").innerHTML=timeremaining;
        if(timeremaining==0){
            stopCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML="<p>GAME OVER!</p><p>Your Score is "+ score +" .</p>"
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing=false;
            document.getElementById("startreset").innerHTML="Start Game";
        }
    }, 1000); //here 1000 is ms as we have to reduce the time by 1 sec in each sec.
}
function stopCountdown(){
    clearInterval(action);
}
function hide(Id){
    document.getElementById(Id).style.display="none";
}
function show(Id){
    document.getElementById(Id).style.display="block";
}
function generateQA(){
    var x=1+Math.round(9*Math.random());
    var y=1+Math.round(9*Math.random());
    correctAnswer=x*y;
    document.getElementById("question").innerHTML=x + "X" + y;
    var correctPosition=1+Math.round(3*Math.random());
    document.getElementById("option"+correctPosition).innerHTML=correctAnswer; //fill one box with correct answer

    //fill pther boxes with wrong answer
    var answers=[correctAnswer];
    for(i=1;i<5;i++){
        if(i!= correctPosition){ 
            var wrongAnswer; 
           do
            {
                wrongAnswer= (1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));
           }while(answers.indexOf(wrongAnswer)>-1)

            document.getElementById("option"+i).innerHTML=wrongAnswer;
            answers.push(wrongAnswer);
        }
    }

}