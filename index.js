function StorePlayerData() {
  localStorage.setItem("playerName", document.forms[0]["playername"].value);
  var playname = localStorage.getItem("playerName");
}

function NameLoad() {
  var playname = localStorage.getItem("playerName");
  document.getElementById("playname").innerHTML = playname;
}
//----------------------------------------------------
function OnLoad() {
  SelectRoom(0);
}
function getDamage() {
  return Math.floor(Math.random() * 50);
}
function getEnemyDamaeg() {
  return Math.floor(Math.random() * (10 - 5) + 5);
}
function getEnemyHp() {
  return Math.floor(Math.random() * (100 - 60) + 50);
}
function fightEnemy(damageDeal) {
  enemyNowHp -= damageDeal;
}
function enemyFight(damageDeal) {
  pokeHp -= damageDeal;
}
function heal() {
  pokeHp = pokeMaxHp;
}
// 5,7,8
function SelectRoom(roomIndex) {
  if (roomIndex == 77) {
    if (getRandomMonster() == 91) {
      SelectRoom(5);
    } else if (getRandomMonster() == 92) {
      SelectRoom(7);
    } else if (getRandomMonster() == 93) {
      SelectRoom(8);
    } else if (getRandomMonster() == 94) {
      SelectRoom(9);
    } else if (getRandomMonster() == 95) {
      SelectRoom(10);
    } else if (getRandomMonster() == 96) {
      SelectRoom(11);
    } else if (getRandomMonster() == 97) {
      SelectRoom(12);
    } else if (getRandomMonster() == 98) {
      SelectRoom(13);
    } else if (getRandomMonster() == 99) {
      SelectRoom(14);
    }
  }
  if (roomIndex == 87) {
    SelectRoom(1);
  }
  if (roomIndex == 6) {
    heal();
    SelectRoom(1);
  }
  if (roomIndex == 100 && doneSetHp == false) {
    enemyHp = getEnemyHp();
    enemyNowHp = enemyHp;
    doneSetHp = true;
  }
  if (roomIndex == 100) {
    damage = getDamage();
    enemyDamage = getEnemyDamaeg();

    if (enemyNowHp > 0 && pokeHp > 0) {
      fightEnemy(damage);
      enemyFight(enemyDamage);
    } else if (pokeHp < 0) {
      ResetEverything();
      SelectRoom(4);
    }
	else if (roomIndex == 15 && enemyNowHp < 0){
		SelectRoom(17)
	} 
	else {
      doneSetHp = false;
      SetPokeExp(100);
      damage = 0;
      enemyHp = 0;
      enemyNowHp = 0;
      SelectRoom(1);
    }
  }

  if (roomIndex == 101 && doneSetHp == false) {
    enemyHp = getEnemyHp();
    enemyNowHp = enemyHp;
    doneSetHp = true;
  }
  if (roomIndex == 101) {
    damage = getDamage();
    enemyDamage = getEnemyDamaeg();

    if (enemyNowHp > 0 && pokeHp > 0) {
      fightEnemy(damage);
      enemyFight(enemyDamage);
    } else if (pokeHp < 0) {
      ResetEverything();
      SelectRoom(4);
    }
	else {
      doneSetHp = false;
      SetPokeExp(100);
      damage = 0;
      enemyHp = 0;
      enemyNowHp = 0;
	  ResetEverything();
	  SelectRoom(17)
    }
  }

  testFunc();
  document.getElementById("roomImage").src = roomArray[roomIndex].image;

  document.getElementById("roomTitle").innerHTML = roomArray[roomIndex].title;
  document.getElementById("roomText").innerHTML = roomArray[roomIndex].text;

  document.getElementById("roomChoices").innerHTML = "";

  for (var i = 0; i < roomArray[roomIndex].choices.length; i++) {
    var options =
      "<button type='button' onClick='SelectRoom(" +
      roomArray[roomIndex]["choices"][i]["index"] +
      ")'>" +
      roomArray[roomIndex]["choices"][i]["text"] +
      "</button>" +
      "  ";
    document.getElementById("roomChoices").innerHTML += options;
  }
}
// ------------------------
var damage = 0;
var enemyHp = 0;
var enemyNowHp = 0;
var enemyDamage = 0;

var doneSetHp = false;
var playname = localStorage.getItem("playerName");
var pokeExp = 0;
var pokeLevelUp = 100;
var pokeMaxHp = 100;
var pokeLevel = 1;
var pokeHp = 100;

function getRandomMonster() {
  min = Math.ceil(1);
  max = Math.floor(10);
  return Math.floor(Math.random() * (10 - 1) + 91);
}

function ResetEverything() {
  pokeExp = 0;
  pokeLevel = 1;
  pokeLevelUp = 100;
  pokeMaxHp = 100;
  pokeHp = 100;
  damage = 0;
  enemyHp = 0;
  enemyNowHp = 0;
}

function SetPokeExp(exp) {
  pokeExp += exp;
  if (pokeExp >= pokeLevelUp) {
    pokeLevel += 1;
    pokeLevelUp += 50;
    pokeExp = 0;
    pokeMaxHp += 50;
    pokeHp += 50;
  }
}
function SetPokeHp(damage) {
  pokeHp = pokeHp - damage;
  if (pokeHp < 0) {
    ResetEverything();
    testFunc();
    SelectRoom(4);
  } else {
    document.getElementById("hp").innerHTML = `HP: ${pokeHp}`;
  }
}
function testFunc() {
  document.getElementById("hp").innerHTML = `HP: ${pokeHp} / ${pokeMaxHp}`;
  document.getElementById("level").innerHTML = `Level: ${pokeLevel}`;
  document.getElementById("exp").innerHTML = `EXP: ${pokeExp} / ${pokeLevelUp}`;
  document.getElementById(
    "ehp"
  ).innerHTML = `Enemy HP: ${enemyNowHp} / ${enemyHp}`;
  document.getElementById("damage").innerHTML = `Damage Deal To Enemy: ${damage}`;
}

var roomArray = [
  {
    image: (src = "SelectPokemon.png"),
    title: "Laboratory", ///0
    text:
      " Hello there! Welcome to the world of pokemon! My name is Oak! People call me the pokemon Prof! This world is inhabited by creatures called pokemon! For some people, pokemon are pets. Others use them for fights. Myself...I study pokemon as a profession. To begin play, choose a pokemon from the pokeballs below: Charmander, Bulbasaur, or Squirtle.",
    choices: [
      {
        text: "Charmander",
        index: 1,
      },
      {
        text: "Bulbasaur",
        index: 2,
      },
      {
        text: "Squirtle",
        index: 3,
      },
      {
        text: "Ignore Him",
        index: 4,
      },
    ],
  },
  {
    image: (src = "charmander.png"),
    title: "Adventure Begin", ///1
    text: "You got a Charmander. What you are going to do next?",
    choices: [
      {
        text: "Train",
        index: 77,
      },
      {
        text: "Heal",
        index: 6,
      },
      {
        text: "Fight Boss",
        index: 15,
      },
      {
        text: "Rage Quit",
        index: 0,
      },
    ],
  },
  {
    image: (src = "bulbarsaur.png"),
    title: "Adventure Begin", ///2
    text: "You got a Bulbasaur. What you are going to do next?",
    choices: [
      {
        text: "Train",
        index: 5,
      },
      {
        text: "Heal",
        index: 6,
      },
      {
        text: "Fight Boss",
        index: 15,
      },
      {
        text: "Rage Quit",
        index: 0,
      },
    ],
  },
  {
    image: (src = "squitle.png"),
    title: "Adventure Begin", ///3
    text: "You got a Squirtle. What you are going to do next?",
    choices: [
      {
        text: "Train",
        index: 5,
      },
      {
        text: "Heal",
        index: 6,
      },
      {
        text: "Fight Boss",
        index: 15,
      },
      {
        text: "Rage Quit",
        index: 0,
      },
    ],
  },
  {
    image: (src = "SelectPokemon.png"),
    title: "Died", ///4
    text: "laugh die",
    choices: [
      {
        text: "Restart",
        index: 0,
      },
    ],
  },
  {
    image: (src = "cabisou.png"),
    title: "Snorlax is here", ///5
    text: "What you are going to do next?",
    choices: [
      {
        text: "Fight",
        index: 100,
      },
      {
        text: "Escape",
        index: 87,
      },
    ],
  },
  {
    image: (src = "stfu.jpeg"),
    title: "Heal", ///6
    text: "What you are going to do next?",
    choices: [
      {
        text: "Move on",
        index: 3,
      },
    ],
  },
  {
    image: (src = "Sneasel.png"),
    title: "Sneasel is here", ///7
    text: "What you are going to do next?",
    choices: [
      {
        text: "Fight",
        index: 100,
      },
      {
        text: "Escape",
        index: 7,
      },
    ],
  },
  {
    image: (src = "Moltres.png"),
    title: "Moltres is here", ///8
    text: "What you are going to do next?",
    choices: [
      {
        text: "Fight",
        index: 100,
      },
      {
        text: "Escape",
        index: 87,
      },
    ],
  },
  {
    image: (src = "Dragonair.png"),
    title: "Dragonair is here", ///9
    text: "What you are going to do next?",
    choices: [
      {
        text: "Fight",
        index: 100,
      },
      {
        text: "Escape",
        index: 87,
      },
    ],
  },
  {
    image: (src = "Lapras.png"),
    title: "Lapras is here", ///10
    text: "What you are going to do next?",
    choices: [
      {
        text: "Fight",
        index: 100,
      },
      {
        text: "Escape",
        index: 87,
      },
    ],
  },
  {
    image: (src = "Ditto.png"),
    title: "Ditto is here", ///11
    text: "What you are going to do next?",
    choices: [
      {
        text: "Fight",
        index: 100,
      },
      {
        text: "Escape",
        index: 87,
      },
    ],
  },
  {
    image: (src = "Meowth.png"),
    title: "Meowth is here", ///12
    text: "What you are going to do next?",
    choices: [
      {
        text: "Fight",
        index: 100,
      },
      {
        text: "Escape",
        index: 87,
      },
    ],
  },
  {
    image: (src = "Nidoqueen.png"),
    title: "Nidoqueen is here", ///13
    text: "What you are going to do next?",
    choices: [
      {
        text: "Fight",
        index: 100,
      },
      {
        text: "Escape",
        index: 87,
      },
    ],
  },
  {
    image: (src = "Articuno.png"),
    title: "Articuno is here", ///14
    text: "What you are going to do next?",
    choices: [
      {
        text: "Fight",
        index: 100,
      },
      {
        text: "Escape",
        index: 87,
      },
    ],
  },
  {
    image: (src = "Magikarp.png"),
    title: "How dare you try to challenge Magikarp", ///15
    text: "What you are going to do next?",
    choices: [
      {
        text: "Fight",
        index: 101,
      },
      {
        text: "Escape",
        index: 87,
      },
    ],
  },
  {
    image: (src = "Gyarados.png"),
    title: "Magikarp involved to Gyarados", ///16
    text: "What you are going to do next?",
    choices: [
      {
        text: "Fight",
        index: 100,
      },
      {
        text: "Escape",
        index: 87,
      },
    ],
  },
  {
    image: (src = "Pokemon master.png"),
    title: "You are Pokemon Master :)", ///17
    text: "",
    choices: [
      {
        text: "Alright~",
        index: 0,
      },
    ],
  },
];
