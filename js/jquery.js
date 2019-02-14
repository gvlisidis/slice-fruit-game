var playing = false;
var score;
var trialsleft;
var fruits = ['apple', 'banana', 'cherrie', 'grape', 'mango', 'orange', 'peach', 'pear', 'watermelon', 'strawberry', 'pineapple'];
var step;
var action;

$(function(){
        //click on start reset button
        $("#startreset").click(function(){

            //we are playing
            if(playing == true){
                 //reload page
                location.reload();

            }else{
                //we are NOT playing
                playing = true;  // game initiated

                score =0;//set score to 0
                $("#scorevalue").html(score);

                //show trials left
                $("#trialsleft").show();
                trialsleft = 3;
                addHearts();

                //hide game over box
                $("#gameOver").hide();


                //change button text to reset game
                $("#startreset").html("Reset Game");


                //start sending fruits
                startAction();

            }
        });
    
$("#fruit1").mouseover(function(){
    score ++;
    $("#scorevalue").html(score); // update score
 //   document.getElementById("slicesound").play();
    $("#slicesound")[0].play();  //play sound
    
    //stop fruit 
    clearInterval(action);
    
    //hide fruit
    $("#fruit1").hide("explode", 500);  // slice fruit
    
    //send new fruit
    setTimeout(startAction, 500);
    
});



//slice a fryit
    //play sound
    //explode fruit


//  -----------------------FUNCTIONS ______________________
function addHearts(){
    $("#trialsleft").empty();
     for(i = 0; i < trialsleft; i++){
                $("#trialsleft").append('<img src = "images/heart.png" class="life"> ');
            }
}

function startAction(){
    //
           //1. create a random fruit
            //define random step
            //2.  move fruit down one step every 30sec
            //is fruit too low?
                //no -> repeat num2
                //yes -> any trials left?
                    //yes : repeat num1
                    //no : show "Game Over",  button text : start game
    //generate a fruit
    $("#fruit1").show();
    chooseFruit(); //choose a random fruit
    
    //random position
    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});
    
    //generate a random step
    step = 1+Math.round(5*Math.random()); // change step
    
    //Move fruit down by one step every 10ms
    action = setInterval(function(){
        $("#fruit1").css('top' , $("#fruit1").position().top + step); //move fruit by one step
        
        //check if fruit is too low
        if($("#fruit1").position().top > $("#fruitcontainer").height()){
            //check if we have trials left
            if(trialsleft > 1){
                 //generate a fruit
                $("#fruit1").show();
                chooseFruit(); //choose a random fruit

                //random position
                $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});

                //generate a random step
                step = 1+Math.round(5*Math.random()); // change step
                //reduce trials by one
                trialsleft --;
                
                //populate trials left box
                addHearts();
            }else{  // GAME OVER
                playing = false; // we are not playing anymore
                $("#startreset").html("Start Game");  // change button to Start game
                $("#gameOver").show();
                $("#gameOver").html('<p> Game Over !</p> <p>  Your score is: '+ score+'</p>');
                $("#trialsleft").hide();
                stopAction();
            }
        }
    }, 10);
    
}

//generate a random fruit
function chooseFruit(){
    $("#fruit1").attr('src', 'images/'+ fruits[Math.round(Math.random()*10)] + '.png');
}

//Stop dropping fruits
function stopAction(){
clearInterval(action);
$("#fruit1").hide();
}
    
    });