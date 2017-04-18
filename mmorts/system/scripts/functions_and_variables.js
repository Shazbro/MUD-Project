//Player Stats
var players = function(health,defense,attack,STR,DEX,CON,INT,WIS,CHA) {
    //Constructor
    this.health = health;
    this.defense = defense;
    this.attack = attack;
    this.STR = STR;
    this.DEX = STR;
    this.CON = CON;
    this.INT = INT;
    this.WIS = WIS;
    this.CHA = CHA;
    
    
};
//Player Classes
var warrior = new players(400,5,6,3,1,1,1,1,1);
var rogue = new players(300,5,8,1,3,1,1,1,1);
var wizard = new players(250,5,6,1,1,1,3,1,1);
var classname;
var classchosen = 0;
//Selected Player
var player;

//Monster Stats
var monsters = function(health,defense,attack) {
    this.health = health;
    this.defense = defense;
    this.attack = attack;
};

//Monster Types
var testMon = new monsters(0,0,0);
var goblin = new monsters(50,5,6);
var skeleton = new monsters(100,5,6);
var ogre = new monsters(150,5,6);
var monstername;
//Selected Monster
var selectedmonster;

//Item Class
var Items = function(name,use,pick,weap,arm){
	//Constructor
	this.name = name;
	this.useable = use;
	this.pickUp = pick;
	this.weapon = weap;
	this.armor = arm;
	this.desc = "";
	
	//Functions
	this.changeDesc = function(newDesc){
		this.desc = newdesc;
	};
	this.changeSettings = function(newUse,newPick,newWeap,newArm){
		this.useable = newUse;
		this.pickUp = newPick;
		this.weapon = newWeap;
		this.armor = newArm;
	};
};

//Room Class
var Rooms = function(name,desc,exit){
	//Constructor
	this.name = name;
	this.desc = desc;
	this.enemy = testMon;
	this.item = new Array();
	this.roomNum = 0;
	this.exit = exit;
	this.inRoom = '[o]';
	
	//Functions
	this.setRoom = function(){
		this.inRoom = '[x]';
	};
	this.setSecret = function(){
		this.inRoom = '[w]';
	};
	this.switchRooms = function(room){
		this.inRoom = '[x]';
		room.inRoom = '[o]';
	};
	this.changeDesc = function(newDesc){
		this.desc = newDesc;
	};
	this.addItem = function(newItem){
		this.item.push(newItem);
	};
	this.removeItem = function(){
		this.item.pop();
	};
	this.moveRoom = function(newRoom,newNum,newExit,newDesc){
		this.name = newRoom;
		this.roomNum = newNum;
		this.exit = newExit;
		this.desc = newDesc;
	};
	this.checkExit = function(direction,exit){
		for(var i=1; i<exit.length; i+=2){
			if(direction == this.exit[i]){
				return true;
			}
		}
		return false;
	};
};
var roomDescs = [
	"Room 0 Desc",
	"Room 1 Desc",
	"Room 3 Desc",
	"Room 4 Desc",
	"Room 5 Desc",
	"Room 6 Desc",
	"Room 7 Desc"];
//Create other Rooms for map
var room_0 = new Rooms("room-0",roomDescs[0],new Array(0,"N",7,"E"));
var room_1 = new Rooms("room-1",roomDescs[1],new Array(0,"S",2,"N"));
var room_2 = new Rooms("room-2",roomDescs[2],new Array(1,"S",3,"E"));
var room_3 = new Rooms("room-3",roomDescs[3],new Array(2,"W",4,"N"));
var room_4 = new Rooms("room-4",roomDescs[4],new Array(3,"S",5,"W"));
var room_5 = new Rooms("room-5",roomDescs[5],new Array(4,"E",6,"E"));
var room_6 = new Rooms("room-6",roomDescs[6],new Array(5,"E"));
var room_7 = new Rooms("room-7",roomDescs[7],new Array(0,"E"));
room_7.setSecret();

//Current Room
var curRoom = room_0;
room_0.setRoom();

var gameSetup = function(className){
	$("<p>Class Created: " + className + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);
            
    document.getElementById("form-input").style.display = null;
    document.getElementById("help_command").style.display = null;
    
    document.getElementById("message_startgame").style.display = "none";
    document.getElementById("warButton").style.display = "none";
    document.getElementById("wizButton").style.display = "none";
    document.getElementById("rogButton").style.display = "none";
    
	$("<p>" + curRoom.desc + ".</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
};

//Class Buttons; Sets Class and reveals Textbox
document.getElementById("warButton").onclick = function(){	
    player = warrior;
    classname = "Warrior";

    gameSetup(classname);
};
document.getElementById("wizButton").onclick = function(){	
    player = wizard;
    classname = "Wizard";

    gameSetup(classname);
};
document.getElementById("rogButton").onclick = function(){	
    player = rogue;
    classname = "Rogue";

    gameSetup(classname);
};

//Battle Variables
var monsterdead = 0;
var playerdead = 0;

//Random Monster Generator
function MakeMonster()
{   
    //Random Number
    var randomnumber = Math.floor(Math.random(10)*10);

    if(randomnumber >= 0 && randomnumber < 3)
    {
        selectedmonster = goblin;
        monstername = "Goblin";
    }
    else if(randomnumber >= 3 && randomnumber < 6)
    {
        selectedmonster = skeleton;
        monstername = "Skeleton";
    }
    else if(randomnumber >= 6)
    {
        selectedmonster = ogre;
        monstername = "Ogre";
    }    
}

//Attack Function
function AttackPhase(attacktype)
{
    $("<p>Combat Initiated!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
    $("<p> " + monstername + "'s Health is " + selectedmonster.health + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);
    $("<p>" + classname + "'s Health is " + player.health + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);
  
    //Player Turn
    if(attacktype == "normal")
    {
        $("<p>Player attacks for " + Math.ceil(Math.random(player.attack)*10+player.STR) + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);       
        selectedmonster.health = selectedmonster.health - Math.ceil(Math.random(player.attack)*10+player.STR-selectedmonster.defense);
        $("<p> " + monstername + "'s Health is now " + selectedmonster.health + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
    }
    else if(attacktype == "spell")
    {
        $("<p>Player attacks for " + Math.ceil(Math.random(8)*10+player.INT) + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);       
        selectedmonster.health = selectedmonster.health - Math.ceil(Math.random(8)*10+player.INT);
        $("<p> " + monstername + "'s Health is now " + selectedmonster.health + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
    }
    else if(attacktype == "buff")
    {
        $("<p>Player heals for " + Math.ceil(Math.random(player.WIS)*10+8) + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);       
        player.health = player.health + Math.ceil(Math.random(player.WIS)*10+8);
        $("<p> " + classname + "'s Health is now " + player.health + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
    }

    //Monster is Dead
    if (selectedmonster.health < 0)
    {
        monsterdead = 1;
        battle = 0;
        $("<p>" + classname + " has won!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
    }
    else 
    {
        //Monster's Turn
        $("<p>Monster Attacks!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
        
        player.health = player.health - Math.ceil(Math.random(selectedmonster.str)+10-player.defense);
        $("<p>" + classname + "'s Health is now " + player.health + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
    }       
    //Player is dead
    if(player.health < 0)
    {
        playerdead = 1;
        battle = 0;
        $("<p> "+ monstername + " has won!</p>").hide().insertBefore("#placeholder").fadeIn(1000);   
    }                     
}

function showMap(){
	$("div.map-ui").replaceWith('<div class="map-ui">'+
		'<p> '+room_6.inRoom+' '+room_5.inRoom+' '+room_4.inRoom+' </p>'+
		'<p> [w] '+room_2.inRoom+' '+room_3.inRoom+' </p>'+
		'<p> [w] '+room_1.inRoom+' [w] </p>'+
		'<p> '+room_7.inRoom+' '+room_0.inRoom+' [w] </p>'+
	'</div>');
}

//Map Movement
function moveMap(direction)
{       
    if(direction == "north")
    {
        if(curRoom.checkExit("N",curRoom.exit) == true)
        {
        	if(curRoom.roomNum == 0)
        	{
        		curRoom = room_1;
        		room_1.switchRooms(room_0);
        	}
        	else if(curRoom.roomNum == 1)
        	{
        		curRoom = room_2;
        		room_2.switchRooms(room_1);
        	}
        	else if(curRoom.roomNum == 3)
        	{
        		curRoom = room_4;
        		room_4.switchRooms(room_3);
        	}
        	$("<p> "+ curRoom.desc + ".</p>").hide().insertBefore("#placeholder").fadeIn(1000);
        	return true;
        }
        else
        {
        	return false;
        }
    }
    else if(direction == "south")
    {
        if(curRoom.checkExit("S",curRoom.exit) == true)
        {
        	if(curRoom.roomNum == 4)
        	{
        		curRoom = room_3;
        		room_3.switchRooms(room_4);
        	}
        	else if(curRoom.roomNum == 2)
        	{
        		curRoom = room_1;
        		room_1.switchRooms(room_2);
        	}
        	else if(curRoom.roomNum == 1)
        	{
        		curRoom = room_0;
        		room_0.switchRooms(room_1);
        	}
        	$("<p> "+ curRoom.desc + ".</p>").hide().insertBefore("#placeholder").fadeIn(1000);
        	return true;
        }
        else
        {
        	return false;
        }
    }
    else if(direction == "west")
    {
        if(curRoom.checkExit("W",curRoom.exit) == true)
        {
        	if(curRoom.roomNum == 0)
        	{
        		curRoom = room_7;
        		room_7.switchRooms(room_0);
        	}
        	else if(curRoom.roomNum == 3)
        	{
        		curRoom = room_2;
        		room_2.switchRooms(room_3);
        	}
        	else if(curRoom.roomNum == 4)
        	{
        		curRoom = room_5;
        		room_5.switchRooms(room_4);
        	}
        	else if(curRoom.roomNum == 5)
        	{
        		curRoom = room_6;
        		room_6.switchRooms(room_5);
        	}
        	$("<p> "+ curRoom.desc + ".</p>").hide().insertBefore("#placeholder").fadeIn(1000);
        	return true;
        }
        else
        {
        	return false;
        }
    }
    else if(direction == "east")
    {
        if(curRoom.checkExit("E",curRoom.exit) == true)
        {
        	if(curRoom.roomNum == 7)
        	{
        		curRoom = room_0;
        	}
        	else if(curRoom.roomNum == 2)
        	{
        		curRoom = room_3;
        	}
        	else if(curRoom.roomNum == 5)
        	{
        		curRoom = room_4;
        	}
        	else if(curRoom.roomNum == 6)
        	{
        		curRoom = room_5;
        	}
        	$("<p> "+ curRoom.desc + ".</p>").hide().insertBefore("#placeholder").fadeIn(1000);
        	return true;
        }
        else
        {
        	return false;
        }
    }   
}
