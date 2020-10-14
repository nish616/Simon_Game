 //$("h1").on("click",nextSequence);
 var buttonColours = ["red", "blue", "green", "yellow"];

 var gamePattern = [];
 var userPattern =[];

 var level = 0;
 var started = false;



//Key press listener
$(document).on("keypress", function(){
    if(!started){
        $("h1").text("Level "+level);  
        nextSequence();
        started = true;
    }
    
    
});


//On click listener
$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour); 


    animatePress(userChosenColour);
    playSound(userChosenColour);
    
    //calling checkanswer function by passing last index
    checkAnswer(userPattern.length -1);
});


//Function to check gamepattern and userpattern values of last index passed.
function checkAnswer(index){
    if(gamePattern[index] == userPattern[index] ){
    
        if(gamePattern.length == userPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }

    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

//Funtion to reset values and start over
function startOver(){
    gamePattern =[];
    level =0;
    started = false;
}

//Function to generate next random sequence
function nextSequence(){

    //Emptying user sequence array
    userPattern =[];
    level++;

    $("h1").text("Level "+level);

    //Generating random number for array index
    var randomNumber = Math.floor(Math.random() * 4);

    //Choosing random colorsfrom buttonColours array and pushing to gamePattern array.
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    //Give fade-in fade-out animation to selected color button on click.
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //Function call to play button sounds
    playSound(randomChosenColour);
    
}

//Function to play sounds on button clicks
function playSound(name){
    var btn_audio = new Audio("sounds/"+name+".mp3" );
    btn_audio.play();
}

//Function to animate button press effect.
function animatePress(currentColour){
$("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");  
    }, 100);
}

