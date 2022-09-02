import inquirer from "inquirer";
import chalk from "chalk";

// setCharacter function
export const setCharacter = (character, characters) => {
  const stats = {};

  for (const { name, health, armor, magic, strength, speed } of characters) {
    if (name === character.toLowerCase()) {
      stats.name = name;
      stats.armor = Math.floor(Math.random() * (armor.max - armor.min + 1)) + armor.min;
      stats.health = Math.floor(Math.random() * (health.max - health.min + 1)) + health.min;
      stats.magic = Math.floor(Math.random() * (magic.max - magic.min + 1)) + magic.min;
      stats.strength = Math.floor(Math.random() * (strength.max - strength.min + 1)) + strength.min;
      stats.speed = Math.floor(Math.random() * (speed.max - speed.min + 1)) + speed.min;
    }
  }

  // return character stats
  return stats;
};

// endGame function
export const endGame = (winnerName, looserName, winnerSecondName, winnerHP) => {
  if (turn === 1) {
    console.log("\n");
    console.log(chalk.yellow(`GG, close one ^^, ${winnerSecondName} still had ${winnerHP} HP, bummer`));
    console.log("\n");
  } else {
    console.log("\n");
    console.log(chalk.yellow(`${winnerName} defeat ${looserName}, ${winnerSecondName} win with ${winnerHP} HP at turn ${turn}`));
    console.log("\n");
  }

  turn = 1;
  hydra = setCharacter("hydra");

  prompt("list", "Play an other game?", ["Yes", "No"], 5);
};

// action function
export const action = (action, attacker, target, choose) => {
  const dice = Math.floor(Math.random() * 6) * 2;
  let damage = null;

  if (choose) {
    switch (action) {
      case "Physical attack":
        damage = attacker.strength + dice - target.armor;
        target.health -= damage;
        console.log(chalk.blue(`${attacker.pseudo} inflicted ${damage} physical damages`));
        break;
      case "Magic attack":
        damage = attacker.magic + dice - target.armor;
        target.health -= damage;
        console.log(chalk.blue(`${attacker.pseudo} inflicted ${damage} magic damages`));
        break;
      case "Armor boost":
        attacker.armor += dice / 2;
        console.log(chalk.blue(`${attacker.pseudo} gain ${dice / 2} armor points`));
        break;
      case "Strenght boost":
        attacker.strength += dice / 2;
        console.log(chalk.blue(`${attacker.pseudo} gain ${dice / 2} strenght points`));
        break;
      case "Magic boost":
        attacker.magic += dice / 2;
        console.log(chalk.blue(`${attacker.pseudo} gain ${dice / 2} magic points`));
        break;
      case "Speed boost":
        attacker.speed += dice / 2;
        console.log(chalk.blue(`${attacker.pseudo} gain ${dice / 2} speed points`));
        break;
      case "Healing spell":
        attacker.health += dice * 2;
        console.log(chalk.blue(`${attacker.pseudo} recovers ${dice * 2} health points`));
        break;
      default:
        break;
    }
  } else {
    if (dice > 6) {
      damage = attacker.strength + dice - target.armor;
      target.health -= damage;
      console.log(chalk.red(`${attacker.name} inflicted ${damage} physical damages`));
    } else {
      damage = attacker.magic + dice - target.armor;
      target.health -= damage;
      console.log(chalk.red(`${attacker.name} inflicted ${damage} magic damages`));
    }
  }
};

// prompt function
export const prompt = (type, message, choices, number) => {
  inquirer
    .prompt([
      {
        type: type,
        name: "answer",
        message,
        choices,
      },
    ])
    .then((res) => {
      switch (number) {
        case 1:
          if (res.answer === "Easy") hydra.headNumber = 1;
          else if (res.answer === "Medium") hydra.headNumber = 2;
          else hydra.headNumber = 3;

          return prompt("list", "Which class do you want to play?", ["Magician", "Paladin", "Barbarian"], 2);
        case 2:
          // create player
          player = setCharacter(res.answer);
          return prompt("input", "What's your name?", [], 3);
        case 3:
          if (res.answer === "") {
            return prompt("input", "What's your name, seriously?", [], 3);
          }

          player.pseudo = res.answer;
          break;
        case 4:
          // player play first
          if (player.speed > hydra.speed) {
            // player attack
            action(res.answer, player, hydra, true);

            // is hydra alive
            if (hydra.health <= 0) return endGame(player.pseudo, "Hydra", "you", player.health);

            // hydra attack
            for (let i = 0; i < hydra.headNumber; i++) action(res.answer, hydra, player, false);

            // is player alive
            if (player.health <= 0) return endGame("Hydra", player.pseudo, "Hydra", hydra.health);

            // hydra play first
          } else {
            // hydra attack
            for (let i = 0; i < hydra.headNumber; i++) action(res.answer, hydra, player, false);

            // is player alive
            if (player.health <= 0) return endGame("Hydra", player.pseudo, "Hydra", hydra.health);

            // player attack
            action(res.answer, player, hydra, true);

            // hydra is alive
            if (hydra.health <= 0) return endGame(player.pseudo, "Hydra", "you", player.health);
          }

          turn++;

          break;
        case 5:
          // restart game
          if (res.answer === "Yes") return prompt("list", "What difficulty do you want", ["Easy", "Medium", "Hard"], 1);

          // exit game
          return process.exit(0);
        default:
          break;
      }

      // send data
      console.log("\n");
      console.log(chalk.cyan(`Turn ${turn}`));
      console.table([player, hydra]);
      console.log("\n");

      // call recursion
      prompt("list", "What attack do you want to make?", ["Physical attack", "Magic attack", "Armor boost", "Strenght boost", "Magic boost", "Speed boost", "Healing spell"], 4);
    });
};
