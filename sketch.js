var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var trees_x;
var clouds;
var collectable;
var canyon;
var platforms;

var game_score; 
var flagPole;
var lives;

var resetx;
var resety;
var resetsize;
var play;
var playbtnwidth;

var Ghosts;
var Crawlers;

var jumpSound;
var ProgressSound;
var gameOverSound;
var fallSound;
var coinSound;
var buttonSound;
var YouWinSound;
var introSound;
var EnemySound;

var introTime;
var YouLose;
var isContact;



function preload()
{
    soundFormats('mp3','wav','ogg');
    
    //load your sounds here
    
    //Jump
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
    
    //coinSound
    coinSound = loadSound('assets/coin.wav');
    coinSound.setVolume(0.1);
    
    //button Sound
    buttonSound = loadSound('assets/button.wav');
    buttonSound.setVolume(0.5);
    
    //Intro Sound
    introSound = loadSound('assets/Intro.wav');
    introSound.setVolume(0.2);
    
    //YouWin Sound
    YouWinSound = loadSound('assets/YouWin.mp3');
    YouWinSound.setVolume(0.1);
    
    //Progress 
    ProgressSound = loadSound('assets/Progress.wav');
    ProgressSound.setVolume(0.2);
    
    //GameOver
    gameOverSound = loadSound('assets/GameOver.wav');
    gameOverSound.setVolume(0.5);
    
    //fallSound
    fallSound = loadSound('assets/fall.mp3');
    fallSound.setVolume(0.1);
    
    //Enemy
    EnemySound = loadSound('assets/EnemyLaugh.mp3');
    fallSound.setVolume(0.1);
    
};



function setup()
{
	createCanvas(1024, 576);
    floorPos_y = height * 3/4;
    
    lives = 3;
    introTime = 0;
    
    play = false;
    YouLose = false ;
    isContact = false;
    
    //Play button
    btnCenter_x =  width/2;
    btnCenter_y = height/2 + 100;
    playbtnwidth = 150;
    
    //Reset button
    resetx = width - 85
    resety = 30;
    resetsize = 30;
  
    introSound.play();
    startGame();
    
}

function mousePressed()
{

  if(dist(mouseX , mouseY , btnCenter_x , btnCenter_y)< 70)
         {
                buttonSound.play();
                playbtnwidth -= 5
                constrain(playbtnwidth , 90 , 100)
                play = true; 

                CheckGameSound();
         }
    
  if(dist(mouseX , mouseY , resetx , resety) < 35)
         {
                  buttonSound.play();
                  introTime = 0;

                  ProgressSound.stop();
                  play = false;
                  YouLose = false;
                  lives = 3;
                  startGame();
         }
}

function draw()
{
    background(0,0,0);
    
    fill(255);
    introTime += 0.05;

    if(introTime > 5 && introTime < 20)
        {
                    fill(255);
                    textSize(20);
                    text("In The Beginning There Was Chaos ..." ,width/2 - 200, height/2)
        }

    if(introTime > 20 && introTime < 29)
                {
                    fill(255);
                    textSize(20);
                    text("Then...When Everyone Least Expected...\n                  A Hero was born." ,width/2 - 200 , height/2)
                }
    
     if(introTime > 29 && introTime < 33)
                {
                    fill(255);
                    textSize(20);
                    text("                      He is....",width/2 - 200 , height/2);
                }
    
    if(introTime > 33 && play == false)
                { 
                    fill(255 , 0 , 0);
                    textFont("Arial Black" , 70);
                    text("THE ADVENTURE BOY",width * 1/4 - 200 , height * 1/4 + 100);
                    
                    //Click to Play button
                    fill(0,0,255);
                    ellipse(random(btnCenter_x, btnCenter_x + 5) , random(btnCenter_y , btnCenter_y + 5) , playbtnwidth);
                    fill(255);
                    textFont("Calibri" , 40);
                    text("Click" ,random(btnCenter_x, btnCenter_x + 5)  - 33  , random(btnCenter_y , btnCenter_y + 5));
                    text("play" ,random(btnCenter_x, btnCenter_x + 5)  - 30 , random(btnCenter_y , btnCenter_y + 5) + 33);
                    fill(255,255,0);
                    rect(width*1/4 - 200 , height * 1/4 + 100 , 860 , 10);
                }
                    
                    
    if( introTime > 33 && play == true)
        {

                background(100, 155, 255); // fill the sky blue

                noStroke();
                fill(0,155,0);
                rect(0, floorPos_y, width, height/4); // draw some green ground

                push();
                translate(scrollPos , 0)

                // Draw clouds.
                drawClouds(); 

                // Draw mountains.
                drawMountains();

                // Draw trees.
                drawTrees()

	// Draw canyons.
    for(var i = 0 ; i < canyon.length ; i ++)
        {
            drawCanyon(canyon[i]);
            checkCanyon(canyon[i]);
        };
            
    // Draw PlatForms
            
    platforms = [];
    
    platforms.push(CreatePlatforms(500,floorPos_y - 100,100));
    platforms.push(CreatePlatforms(630,floorPos_y - 200,200));
    platforms.push(CreatePlatforms(1000,floorPos_y - 100,100));
    platforms.push(CreatePlatforms(1400,floorPos_y - 200,200));
    platforms.push(CreatePlatforms(1700,floorPos_y - 200,200));
    platforms.push(CreatePlatforms(2000,floorPos_y - 100,200));
    platforms.push(CreatePlatforms(2500,floorPos_y - 100,50));
    platforms.push(CreatePlatforms(3000,floorPos_y - 200,200));
    platforms.push(CreatePlatforms(4000,floorPos_y - 100,50));         
            
    for(var i = 0 ; i < platforms.length; i ++)
        {
            platforms[i].draw();
        };

	// Draw collectable items.
    
    for(var i = 0 ; i < collectable.length ; i ++)
        {
            if(collectable[i].isFound == false)
                {
                    drawCollectable(collectable[i]);
                                
                    if(collectable[i].isFound == false)
                         {
                            checkCollectable(collectable[i]);
                         };
                };
        };
        

    //draw Crawlers
    for(var i = 0 ; i < Crawlers.length ;i ++ )
        {
            Crawlers[i].draw();
            
            var isTouch = Crawlers[i].Checktouch(gameChar_world_x ,gameChar_y);
            
            if(isTouch == true)
                {
                    if(lives > 0)
                        {
                            isPlummeting = true;
                            fallSound.play();
                            Crawlers[i].touchEnemy = true;
                            EnemySound.play();
                        }
                }
        }
       
    //Draw Ghosts        
    for(var i = 0 ; i < Ghosts.length ; i ++)
        {      
            Ghosts[i].draw();
            
            var touchGhosts = Ghosts[i].CheckEnemy(gameChar_world_x,gameChar_y);
            
            if(touchGhosts == true)
                {
                     if(lives > 0)
                        { 
                            isPlummeting = true;
                            fallSound.play();
                            Ghosts[i].touchEnemy = true;
                            Ghosts[i].x += random(-3,3);
                            EnemySound.play();
                        }
                }
        };    
                  
    //Call render FlagPole
    renderFlagPole();
                    
    //Check Player Dies
    checkPlayerDie();

    pop();
    
    // Draw game character.
    drawGameChar(); 

    // Draw score
    fill(255);
    noStroke();
    textFont("Calibri", 25)
    text("Score: " + game_score , 20 , 60);
  
    //life indicator
    var i = 0.1
    
    for( var k = 0 ; k < lives ; k ++ )
        {
                fill(255, 0 ,0);
                beginShape();
                vertex(200 * i + k * 40,350 * i );
                bezierVertex(200 * i + k * 40, 
                             250 * i ,350 * i + k * 40,
                             200 * i ,350 * i + k * 40,
                             150 * i );
                bezierVertex(350 * i + k * 40,
                             100 * i ,250 * i + k * 40,
                             50 * i ,200 * i + k * 40,
                             140 * i );
                bezierVertex(150 * i + k * 40,50 * i ,
                             50 * i + k * 40,100 * i ,
                             50 * i + k * 40,
                             150 * i );
                bezierVertex(50 * i + k * 40,
                             200 * i ,200 * i + k * 40,
                             250 * i, 
                             200 * i + k * 40,
                             350 * i );
                endShape();
        }
        
    //Restart Game
            fill(255,0, 0);
            ellipse(resetx , resety , resetsize);
            fill(0);
            
            textFont("calibri",25)
            text("reset" , width - 110 , 60);
            
    
    if(isPlummeting == true)
        {
                fill(0);
                noStroke();
                textFont("Arial Black", 90)
                text(" WASTED " , width * 1/4 , height * 1/4 + 100);
  
        };
            
    if(YouLose == true)
        { 
                fill(0);
                noStroke();
                textFont("Arial Black", 90)
                text(" GAME OVER " , width * 1/4 - 100 , height * 1/4 + 100);
                textFont(" Consolas " , 40);
                text(" press space to continue " , random (width * 1/4 - 100,width * 1/4 - 90) + 60 , height * 3/4 + 100);
                
                return; 
         };
            

    
    if(flagPole.isReached == true)
        {
                 fill(0);
                 noStroke();
                 textFont("Arial Black", 70)
                 text(" LEVEL COMPLETE " , width * 1/4 - 100 , height * 1/4 + 100); 
                 textFont(" Consolas " , 35)
                 text(" You Scored : " + game_score , width * 1/4 + 100  , height * 1/4 + 190); 
                 textFont(" Consolas " , 40);
                 text(" press space to continue " , random (width * 1/4 - 100,width * 1/4 - 90) + 60 , height * 3/4 + 100);
            
                 return;
        };
    
	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
            if(gameChar_x > width * 0.2)
            {
                    gameChar_x -= 5;
            }
            else
            {
                    scrollPos += 5;
            }
    };

	if(isRight)
	{
		  if(gameChar_x < width * 0.8)
          {
                gameChar_x  += 5;
          }
          else
          {
                scrollPos -= 5; // negative for moving against the background
          }
	}

	// Logic to make the game character rise and fall.
    
    if(gameChar_y < floorPos_y)
           {
               var isContact = false;
               
               for(var i = 0 ; i < platforms.length; i++)
                   {
                       if(platforms[i].CheckContact(gameChar_world_x,gameChar_y) == true)
                           {
                               isContact = true;
                               isFalling = false; 
                               
                               break; 
                           }
                   };
                       
                         if( isContact == false  )
                           {
                                gameChar_y += 5;
                                isFalling = true;
                           };
           }
        else
           {  
                isFalling = false;
           };

        if(flagPole.isReached == false)
            {
                checkFlagPole();
            };
            
        if(YouLose == false)
            { 
                LoseGame();
            };

	// Update real position of gameChar for collision detection.
    
	     gameChar_world_x = gameChar_x - scrollPos;
        }


};


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){
    
    //left Arrow Pressed
	if(keyCode == 37 || keyCode == 65 || key == 'A')
    {  
        isLeft = true;
    }
    
    //right arrow Pressed
    else if(keyCode == 39 || keyCode == 68 || key == 'D')
    {
        isRight = true;
    }
    
    //Spacebar Pressed
    if((key == ' ' ||key == 'W' || keyCode == 87 || keyCode == 32)&& flagPole.isReached == false && isPlummeting == false && isFalling == false && YouLose == false)
    {
        gameChar_y -= 200;
        jumpSound.play();
    };
    
     //Restart 
    if((key == ' ' ||key == 'W' || keyCode == 32 )&& (YouLose == true || flagPole.isReached == true))
    {
        play = true;
        YouLose = false;
        lives = 3;
        startGame();
    };
};

function keyReleased()
{

    //left Arrow Released
    if(key == 'A' || keyCode == 65 || keyCode == 37 )
    {
        isLeft = false;
    }
    
    //right Arrow Released
    else if(key == 'D' || keyCode == 68|| keyCode == 39)
    {
        isRight = false;
    };
};


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
        // draw game character
    
        //the game character
        if(isLeft && isFalling)
        {
            
                // add your jumping-left code
                //head
                fill(0);
                ellipse(gameChar_x, gameChar_y - 55, 30,30);

                //right leg
                stroke(10);
                strokeWeight(5);
                line(gameChar_x - 5 ,gameChar_y - 20, gameChar_x - 20, gameChar_y - 10 );

                 //right Arm
                line(gameChar_x - 10 ,gameChar_y - 30,gameChar_x - 20,gameChar_y - 35 );

                //chest
                noStroke();
                fill(255,0,0);
                rect(gameChar_x - 15,gameChar_y - 40, 30, 25,5);

                //left leg
                stroke(10);
                strokeWeight(5);
                line(gameChar_x + 3 ,gameChar_y - 15,gameChar_x + 20 ,gameChar_y - 10);

                //left arm
                line(gameChar_x + 4 ,gameChar_y - 30, gameChar_x + 18 ,gameChar_y - 40);

                strokeWeight(1);

        }
        else if(isRight && isFalling)
        {
                    // add your jumping-right code
                //head
                fill(0);
                ellipse(gameChar_x, gameChar_y - 55, 30,30);

                //right leg
                strokeWeight(5);
                stroke(10);
                line(gameChar_x - 5 , gameChar_y - 15, gameChar_x - 20, gameChar_y - 10 );

                //left arm
                line(gameChar_x + 4 , gameChar_y - 30, gameChar_x + 18 , gameChar_y - 40);

                //chest
                noStroke();
                fill(255,0,0);
                rect(gameChar_x - 15, gameChar_y - 40, 30, 25,5);

                //left arm
                stroke(10);
                strokeWeight(5);
                line(gameChar_x + 3 , gameChar_y - 17, gameChar_x + 20 , gameChar_y - 10);

                //right arm
                line(gameChar_x - 5 , gameChar_y - 30, gameChar_x - 20, gameChar_y - 40 );
                strokeWeight(1);
        }
        else if(isLeft)
        {
                    // add your walking left code
                //head
                fill(0);
                ellipse(gameChar_x, gameChar_y - 55, 30,30);

                //right arm
                stroke(10);
                strokeWeight(5);
                line(gameChar_x - 10 , gameChar_y - 30, gameChar_x - 20, gameChar_y - 20 );

                //left leg
                line(gameChar_x - 10 , gameChar_y - 20, gameChar_x - 20, gameChar_y - 5 );

                //right leg
                line(gameChar_x - 2 , gameChar_y - 20, gameChar_x + 15 , gameChar_y - 5);

                //chest
                noStroke();
                fill(255,0,0);
                rect(gameChar_x - 15, gameChar_y - 40, 30, 25,5);

                //left arm
                stroke(0);
                strokeWeight(5);
                line(gameChar_x + 5 , gameChar_y - 30, gameChar_x + 18 , gameChar_y - 20);
                strokeWeight(1);

        }
        else if(isRight)
        {
                    // add your walking right code
                //head
                fill(0);
                ellipse(gameChar_x, gameChar_y - 55, 30,30);

                //right leg
                strokeWeight(5);
                stroke(10);
                line(gameChar_x - 5 , gameChar_y - 20, gameChar_x - 20, gameChar_y - 5 );

                //left leg
                line(gameChar_x + 3 , gameChar_y - 20, gameChar_x + 15 , gameChar_y - 5);

                //left arm
                line(gameChar_x + 4 , gameChar_y - 30, gameChar_x + 18 , gameChar_y - 20);

                //chest
                noStroke();
                fill(255,0,0);
                rect(gameChar_x - 15, gameChar_y - 40, 30, 25,5);

                //right arm
                stroke(10);
                strokeWeight(5);
                line(gameChar_x - 5 , gameChar_y - 30, gameChar_x - 20, gameChar_y - 20 );
                strokeWeight(1);

        }
        else if(isFalling || isPlummeting)
        {
                    // add your jumping facing forwards code
                //head
                fill(0);
                ellipse(gameChar_x, gameChar_y - 55, 30,30);

                //right arm
                stroke( 0);
                strokeWeight(5);
                line(gameChar_x - 20, gameChar_y - 60,gameChar_x - 20, gameChar_y - 32 );

                //left arm
                line(gameChar_x + 20, gameChar_y - 60,gameChar_x + 20, gameChar_y - 32);

                //left leg
                line(gameChar_x + 5 , gameChar_y - 20,gameChar_x + 5, gameChar_y);

                //right leg
                line(gameChar_x - 5 , gameChar_y - 20,gameChar_x - 5, gameChar_y);

                //chest
                noStroke();
                fill(255,0,0);
                rect(gameChar_x - 15, gameChar_y - 40, 30, 25,5);
                strokeWeight(1);

        }
        else
        {
                    // add your standing front facing code
                //head
                fill(0);
                ellipse(gameChar_x, gameChar_y - 55, 30,30);

                //right arm
                stroke(10);
                strokeWeight(5);
                line(gameChar_x - 20, gameChar_y - 35,gameChar_x - 20, gameChar_y - 10 );

                //left arm
                line(gameChar_x + 20, gameChar_y - 35,gameChar_x + 20, gameChar_y - 10);

                //right leg
                line(gameChar_x + 5 , gameChar_y - 20,gameChar_x + 5, gameChar_y);

                //left leg
                line(gameChar_x - 5 , gameChar_y - 20,gameChar_x - 5, gameChar_y);

                //chest
                noStroke();
                fill(255,0,0);
                rect(gameChar_x - 15, gameChar_y - 40, 30, 25,5);
                strokeWeight(1);

        }
};

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
 function drawClouds()
   {
       for(var i = 0 ; i < clouds.length ; i ++ )
        {
            //Clouds
            fill(255,255,255);
            ellipse(clouds[i].x_Pos + 100,150,
                    clouds[i].y_Pos + 50,
                    clouds[i].size + 50);
            
            ellipse(clouds[i].x_Pos + 150,150,
                    clouds[i].y_Pos + 20,
                    clouds[i].size + 20);
            
            ellipse(clouds[i].x_Pos + 60,150,
                    clouds[i].y_Pos + 20,
                    clouds[i].size + 20);
            
            clouds[i].x_Pos -= 0.2;
        }
   }

// Function to draw mountains objects.
    function drawMountains()
     {
        for(var i = 0 ; i < mountains.length ; i ++)
         {
            //Mountain
            fill(100,100,100);
            triangle((mountains[i].x_Pos + 300) - mountains[i].size,
                     mountains[i].y_Pos + 332,
                     (mountains[i].x_Pos + 580) + mountains[i].size,
                     mountains[i].y_Pos + 332,
                     mountains[i].x_Pos + 430,
                     (mountains[i].y_Pos + 170) - mountains[i].size );

            //snow on top of mountain
            fill(255);
            triangle((mountains[i].x_Pos + 505) + mountains[i].size,
                     mountains[i].y_Pos + 250,
                     (mountains[i].x_Pos + 405 )- mountains[i].size,
                     mountains[i].y_Pos + 200,
                     (mountains[i].x_Pos + 430) + mountains[i].size,
                     mountains[i].y_Pos + 170);
                   
            triangle((mountains[i].x_Pos + 455) + mountains[i].size,
                     mountains[i].y_Pos + 200,
                     (mountains[i].x_Pos + 365) - mountains[i].size,
                     mountains[i].y_Pos + 250,
                     mountains[i].x_Pos + 430,
                     (mountains[i].y_Pos + 170) - mountains[i].size); 
             
            triangle((mountains[i].x_Pos + 455) + mountains[i].size,
                     mountains[i].y_Pos + 200,
                     mountains[i].x_Pos + 410,
                     mountains[i].y_Pos + 200,
                     mountains[i].x_Pos + 410,
                     mountains[i].y_Pos + 250);
            }
    };

// Function to draw trees objects.
    function drawTrees()
    {
       for( var i = 0 ; i < trees_x.length ; i ++ )
        {
            //trunk
            fill(120,100,40);
            rect(trees_x[i], floorPos_y - height/4 + 60,50,85);

            //branches
            fill(0,200,0);
            triangle(trees_x[i] - 52,
                     floorPos_y - height/4 + 12,
                     trees_x[i] + 98,
                     floorPos_y - height/4 + 12,
                     trees_x[i] + 23,
                     floorPos_y - height/4 - 88); 

            triangle(trees_x[i] - 52,
                     floorPos_y - height/4 + 62,
                     trees_x[i] + 98,
                     floorPos_y - height/4 + 62,
                     trees_x[i] + 23,
                     floorPos_y - height/4 - 38);
        }
    };


// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
    // Draw canyons
            //Canyon
    for(var i = 0 ; i < canyon.length ; i ++ )
        {
            fill(100,155,255,100);
            triangle(t_canyon.x_Pos + 100,432,
                     t_canyon.x_Pos + t_canyon.width + 100 + t_canyon.width * 0.05,
                     t_canyon.width + 800,
                     t_canyon.x_Pos + t_canyon.width + 200 ,432);
            
            fill(153,204,255);
            triangle(t_canyon.x_Pos + t_canyon.width * 0.045 + 115 ,500,
                     t_canyon.x_Pos + t_canyon.width + 100 ,
                     t_canyon.width + 800,
                     t_canyon.x_Pos + t_canyon.width + 187 ,500);
        }
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
        if(gameChar_world_x < t_canyon.x_Pos + t_canyon.width + 200  && gameChar_world_x > t_canyon.x_Pos + 100 && gameChar_y == floorPos_y)
        {
            isPlummeting = true;
            fallSound.play();
        }

        if(isPlummeting == true)
        {
            gameChar_y += 0.15;     
        };
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{
     for(var i = 0 ; i < collectable.length ; i ++)
        {  
            fill(250,200,0);
            ellipse(t_collectable.x_Pos ,
                    t_collectable.y_Pos,
                    t_collectable.size - 20,
                    30);
            
            fill(255,255,0);
            ellipse(t_collectable.x_Pos,
                    t_collectable.y_Pos ,
                    t_collectable.size - 25,
                    25);
        };
}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
 if(dist(gameChar_world_x, gameChar_y , t_collectable.x_Pos , t_collectable.y_Pos ) < 50)
      {   
                  t_collectable.isFound = true;
                  coinSound.play();
                  game_score += 1;
      }
};

function renderFlagPole()
      {
          //flagPole
                  strokeWeight(5);
                  stroke(255,255 , 0);
                  line(flagPole.x_Pos ,floorPos_y ,flagPole.x_Pos , floorPos_y - 350 );
                  noStroke();
           
          if(flagPole.isReached)
              {
                  fill(255 ,0 ,0 )
                  triangle(flagPole.x_Pos , floorPos_y - 350 , flagPole.x_Pos , floorPos_y - 270 ,flagPole.x_Pos + 100 , floorPos_y - 300  ); 
              }
          else
              {
                  fill(255 ,0 ,0 )
                  triangle(flagPole.x_Pos , floorPos_y, flagPole.x_Pos , floorPos_y - 80 ,flagPole.x_Pos + 100 , floorPos_y -20 );
              };
       };

function checkFlagPole()
        {
            var d = abs(gameChar_world_x - flagPole.x_Pos);
            
            if(d < 15)
                { 
                     flagPole.isReached = true ; 
                     YouWinSound.play();
                }
        };
 
function checkPlayerDie()
                {
                    if(gameChar_y > height )
                        {
                            play = true;
                            lives -= 1;
                            startGame();
                        }
                };

function LoseGame()
                 {
                   if(lives < 1)
                      {
                            YouLose = true; 
                            gameOverSound.play();
                      };
                 };

function CheckGameSound()
                {
                    if(introTime > 33 && play == true)
                        {
                            ProgressSound.loop();
                        }
                }

function Enemy(x,y, colour , range)
                {
                    
                    this.x = x;
                    this.y = y;
                    this.colour = colour;
                    this.range = range;
                    this.currentY = y;
                    this.incr = 1;
                    
                    this.update = function()
                    {
                        this.currentY -= this.incr
                        if(this.currentY <= this.y - this.range)
                                {
                                    this.incr = -1;
                                }
                        else if(this.currentY > this.y)
                                {
                                    this.incr = 1;
                                }
                   };
                         
                   this.draw = function()
                    {
                        this.update();
                       //Draw Ghosts

                        noStroke();
                        fill(colour);
                        ellipse(this.x, this.currentY - 282, 60);
                        rect(this.x - 30, this.currentY - 282, 60, 35);
                        triangle(this.x , this.currentY - 250, this.x - 30, this.currentY - 220, this.x - 30, this.currentY - 250);
                        triangle(this.x - 30, this.currentY - 250, this.x - 10, this.currentY - 220, this.x + 10, this.currentY - 250);
                        triangle(this.x     , this.currentY - 250, this.x + 30, this.currentY - 220, this.x + 30, this.currentY - 250);
                        triangle(this.x - 10, this.currentY - 250, this.x + 10, this.currentY - 220, this.x + 20, this.currentY - 250);

                        fill(255);
                        ellipse(this.x - 15 , this.currentY - 282 , 15)
                        ellipse(this.x + 15 , this.currentY - 282 , 15)

                        stroke(colour)
                        strokeWeight(5);
                        line(this.x - 10 , this.currentY - 288 ,this.x - 20 , this.currentY - 296 )
                        line(this.x + 10 , this.currentY - 288 , this.x + 20 , this.currentY - 296)
                        point(this.x - 15 , this.currentY - 282);
                        point(this.x + 15 , this.currentY - 282)
                        
                        noStroke();
                    };
                    
                       this.CheckEnemy = function(gameChar_world_x , gameChar_y)
                        {
                           
                        var d = dist(gameChar_world_x,gameChar_y, this.x, this.currentY - 282)
                                    if( d < 50 && flagPole.isReached == false && YouLose == false )
                                        {
                                            return true;
                                        }
                                    return false;
                        }    
     
                  };
                    


function CreatePlatforms(x, y ,length)
{
    var p = {
                x: x ,
                y: y ,
                length: length,
                draw: function()
            {
                stroke(5);
                fill(160,89,39);
                rect(this.x , this.y , this.length, 20)
                noStroke();
    
            } ,
                CheckContact: function(gc_x , gc_y)
                    {
                        if(gc_x > this.x && gc_x < this.x + this.length )
                            {
                                var d = this.y - gc_y;
                                
                                if(d >= 0 && d < 5)
                                    {  
                                        return true;
                                    } 
                                return false;
                            }
                    }
            }
        return p;
}


function Crawler(x , y , range)
{
                this.x = x;
                this.y = y;
                this.range = range;    
                this.currentX = x;
                this.incr = 1;
    
                this.update = function()
            {
                this.currentX += this.incr
        
                        if(this.currentX >= this.x + this.range)
                            {
                                this.incr = -1;
                            }
                                else if(this.currentX < this.x)
                            {
                                this.incr = 1;
                            }
            };
    
                this.draw = function()
            {
                this.update();
                fill(0);
                ellipse(this.currentX , this.y , 20);
                fill(255);
                ellipse(this.currentX - 5 , this.y , 8)  
                ellipse(this.currentX + 5 , this.y , 8) 
                stroke(0) 
                strokeWeight(3);    
                point(this.currentX + 5,this.y);
                point(this.currentX - 5, this.y);
                noStroke();
    
            }
    
                this.Checktouch = function()
            {
            var d = dist(gameChar_world_x,gameChar_y, this.currentX, this.y)
            
                if(d < 20 )
                    {
                        return true;
                    }
            return false;
        }    
}



             
function startGame()
                {
                    
                gameChar_x = width/2;
                gameChar_y = floorPos_y;

                // Variable to control the background scrolling.
                    
                scrollPos = 0;

                // Variable to store the real position of the gameChar in the game
                // world. Needed for collision detection.
                    
                gameChar_world_x = gameChar_x - scrollPos;

                // Boolean variables to control the movement of the game character.
                    
                isLeft = false;
                isRight = false;
                isFalling = false;
                isPlummeting = false;

                // Initialise arrays of scenery objects.
                    
                 trees_x = [-400 ,0 , 100, 150 , 300 ,500 ,800 , 1000, 1300 , 1500, 1600 , 1900, 2000 ,2200 , 2500, 2600 , 2800, 3000 ,3100, 3400 , 3500 , 3700 , 3900 , 4100 , 4400 ,4500, 4600, 4800 ,5200  ];

                 clouds = [{x_Pos: 100, y_Pos: 70, size: 10},
                           {x_Pos: 400, y_Pos: 100, size: 50},
                           {x_Pos: 800, y_Pos: 100, size: 50}, 
                           {x_Pos: 1200, y_Pos: 70, size: 70},
                           {x_Pos: 900, y_Pos: 100, size: 50},
                           {x_Pos: 1800, y_Pos: 100, size: 50},
                           {x_Pos: 2000, y_Pos: 200, size: 50},
                           {x_Pos: 2800, y_Pos: 70, size: 70},
                           {x_Pos: 3400, y_Pos: 100, size: 50},
                           {x_Pos: 3600, y_Pos: 100, size: 50}, 
                           {x_Pos: 3900, y_Pos: 70, size: 70},
                           {x_Pos: 4100, y_Pos: 100, size: 50},
                           {x_Pos: 4500, y_Pos: 100, size: 50},
                           {x_Pos: 5500, y_Pos: 200, size: 50}];

                 mountains = [{x_Pos: 300, y_Pos: 100, size:15},
                              {x_Pos: 800, y_Pos: 100, size:10},
                              {x_Pos: 700, y_Pos: 100, size:20},
                              {x_Pos: 1200, y_Pos: 100, size:40},
                              {x_Pos: 1800, y_Pos: 100, size:50},
                              {x_Pos: 2500, y_Pos: 100, size:30},
                              {x_Pos: 3000, y_Pos: 100, size:40},
                              {x_Pos: 3500, y_Pos: 100, size:5},
                              {x_Pos: 3800, y_Pos: 100, size:15},
                              {x_Pos: 4200, y_Pos: 100, size:10},
                              {x_Pos: 4800, y_Pos: 100, size:40}];


                 collectable = [{x_Pos: 600, y_Pos: 200, size: 50,isFound: false},
                                {x_Pos: 800, y_Pos: 400, size: 50,isFound: false},
                                {x_Pos: 1000, y_Pos: 400, size: 50,isFound: false}, 
                                {x_Pos: 1300, y_Pos: 200, size: 50,isFound: false},
                                {x_Pos: 1500, y_Pos: 200, size: 50,isFound: false},
                                {x_Pos: 1700, y_Pos: 400, size: 50,isFound: false},
                                {x_Pos: 2000, y_Pos: 200, size: 50,isFound: false},
                                {x_Pos: 2300, y_Pos: 200, size: 50,isFound: false},
                                {x_Pos: 2600, y_Pos: 400, size: 50,isFound: false}, 
                                {x_Pos: 2800, y_Pos: 400, size: 50,isFound: false},
                                {x_Pos: 3000, y_Pos: 400, size: 50,isFound: false},
                                {x_Pos: 3400, y_Pos: 200, size: 50,isFound: false},
                                {x_Pos: 3600, y_Pos: 200, size: 50,isFound: false},
                                {x_Pos: 3900, y_Pos: 200, size: 50,isFound: false},
                                {x_Pos: 4100, y_Pos: 400, size: 50,isFound: false}, 
                                {x_Pos: 4300, y_Pos: 200, size: 50,isFound: false},
                                {x_Pos: 4600, y_Pos: 400, size: 50,isFound: false},
                                {x_Pos: 4900, y_Pos: 400, size: 50,isFound: false}];

                     canyon = [{x_Pos: -300,width: 100},
                               {x_Pos: 50 ,width: 30},
                               {x_Pos: 0,width: 30},
                               {x_Pos: 500 ,width: 30},
                               {x_Pos: 800 ,width: 40},
                               {x_Pos: 1000 ,width: 30},
                               {x_Pos: 1500,width: 30},
                               {x_Pos: 2000,width: 20},
                               {x_Pos: 2500 ,width: 50},
                               {x_Pos: 3000,width: 50},
                               {x_Pos: 3500 ,width: 30},
                               {x_Pos: 3900,width: 50},
                               {x_Pos: 4300 ,width: 30},
                               {x_Pos: 4600 ,width: 50}];

                    //Ghost
                     Ghosts = [];
                    
                     Ghosts.push(new Enemy( 800, 800, color(random(0,100) ,random(0,100),random(0,100)) , 400))
                     Ghosts.push(new Enemy( 1400, 800, color(random(0,100) ,random(0,100),random(0,100)) , 400))
                     Ghosts.push(new Enemy( 1900, 800, color(random(0,100) ,random(0,100),random(0,100)) , 400))
                     Ghosts.push(new Enemy( 2500, 800, color(random(0,100) ,random(0,100),random(0,100)) , 400))
                     Ghosts.push(new Enemy( 3200, 800, color(random(0,100) ,random(0,100),random(0,100)) , 400))
                     Ghosts.push(new Enemy( 4000, 800, color(random(0,100) ,random(0,100),random(0,100)) , 400))
                    
                    //Crawlers
                    Crawlers = [];
                    
                    Crawlers.push(new Crawler(800,floorPos_y - 10 , 100))
                    Crawlers.push(new Crawler(1700,floorPos_y - 10 , 100))
                    Crawlers.push(new Crawler(2000,floorPos_y - 10 , 100))
                    Crawlers.push(new Crawler(3000,floorPos_y - 10 , 100))
                    Crawlers.push(new Crawler(4500,floorPos_y - 10 , 100))
                    Crawlers.push(new Crawler(4800,floorPos_y - 10 , 100))
                    
                    flagPole = {isReached: false , x_Pos : 5000}
                    game_score = 0 ;
                    
                };
    
