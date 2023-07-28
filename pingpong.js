
//aternate idea: the ball object is made and paddle object is made, so apply ball.js logic with condition that if ball touches downpaddle, it willgo
//anywhere in up direction and if ball touches up-paddle, then change the direction of the ball anywhere in the down direction. make the paddles move using keyboard



//select canvas
const canvas=document.getElementById("myGame");
const context=canvas.getContext("2d");


//draw rectangle, in the "context"
function drawRect(x,y,w,h,color){
    console.log("rect");
    context.fillStyle=color;
    context.fillRect(x,y,w,h);
}

//computer paddle, we are mking this as separat object because we'd use this to move
const com={
    x:canvas.width/2-50/2,
    y:1,
    width:80,
    height:10,
    color:"blue",
    score:0
}

//user paddle
const user={
    x:canvas.width/2-50/2,
    y:canvas.height-10,
    width:80,
    height:10,
    color:"violet",
    score:0
}

//center-line
function centerLine(){
    console.log("center");
    context.beginPath()
    context.setLineDash([10])
    context.moveTo(0,canvas.height/2)
    context.lineTo(canvas.width,canvas.height/2)
    context.strokeStyle="white"
    context.stroke()
}

//draw circle
function drawCircle(x,y,r,color){
    console.log("circle")
    context.fillStyle=color
    context.beginPath()
    context.arc(x,y,r,0,Math.PI*2,false)
    context.closePath()
    context.fill()
}

//create a ball
const ball={        //this object has proprties needed for "draw circle " as well as spped,velcity etc for funtioning
    x: canvas.width/2,
    y: canvas.height/2,
    radius:10,
    speed:1,
    velocityX:5,
    velocityY:5,
    color:"red"
}

//scores
function drawText(text,x,y,color){
    console.log("text")
    context.fillStyle=color
    context.font="32px josefin sans"
    context.fillText(text,x,y)
}

//render the game
function render(){
    //make canvas
    drawRect(0,0,400,600,"white");
    
    //comp paddle
    drawRect(com.x,com.y,com.width,com.height,com.color)
    
    //user paddle
    drawRect(user.x,user.y,user.width,user.height,user.color)

    //center line
    centerLine();

    //create the ball
    drawCircle(ball.x,ball.y,ball.radius,ball.color)

    //scores of com and user
    drawText(com.score,20,canvas.height/2-30)
    drawText(user.score,20,canvas.height/2+50)
}


//control user paddle
canvas.addEventListener("mousemove",movepaddle);

function movepaddle(e){
    let rect=canvas.getBoundingClientRect();
    com.x=e.clientX-rect.left-user.width/2;
    user.x=e.clientX-rect.left-user.width/2;
}



//collision detection
function collision(b,p){   //b-ball,p-player
    b.top=b.y-b.radius;
    b.bottom=b.y+b.radius;
    b.left=b.x-b.radius;
    b.right=b.x+b.radius;

    p.top=p.y;
    p.bottom=p.y+p.height;
    p.left=p.x;
    p.right=p.x+ p.width;
    
    //collision condition:
    return p.right > b.left && p.left < b.right && b.bottom>p.top && b.top<p.bottom;
} 

//reset 
function resetBall(){
    ball.x=canvas.width/2;
    ball.y=canvas.height/2;

    ball.speed=1;
    ball.velocityY= -ball.velocityY;
}

function gameover(){
    if(user.score==0 && com.score==0){
        alert("restart again")
    }
    if(user.score==com.score){
        alert("match is draw with score "+user.score)
    }
    else if(user.score>com.score){
    alert("user wins with score "+user.score);
    }
    else{
        alert("comp wins with score "+com.score);
    }
    //clearInterval(loop);
}

//update
function update(){
    ball.x += ball.velocityX*ball.speed;  //goes right
    ball.y += ball.velocityY*ball.speed;  //goes down
    
    /*
    //contrl the computer paddle
    let computerLevel=0.1;
    com.x +=(ball.x-(com.x+com.width/2)) + computerLevel;
    if(ball.speed >2){
        com.x += ball.x +100;
    }*/

    //reflect the ball from wall
    if(ball.x+ball.radius>canvas.width || ball.x-ball.radius<0){
        ball.velocityX = -ball.velocityX  //goes left
    }

    //if collision happens
    let player= (ball.y<canvas.height/2) ? com:user;
    if(collision(ball,player)){
        player.score++;
        ball.velocityY= -ball.velocityY    //reflects down or up on collisiom
        //ball.speed += 0.1;  //increase ball speed on every collision
    }
    
    
    //points
    if(ball.y - ball.radius < 0){
        gameover();
        //resetBall()
        clearInterval(loop);
    }
    else if(ball.y+ball.radius>canvas.height){
        gameover();
        //resetBall()
        clearInterval(loop);
    }
    
    if(user.score >50 || com.score>50){
        clearInterval(loop);
    }
}

//start the game
function start(){
    update()
    render()
}

//loop
const loop=setInterval(start,1000/50); //in 1 second,the start function will run 50 times


