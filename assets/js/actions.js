const getElement = (name) => document.querySelector(`#${name}`);

// player data
const playerName = getElement("playerName");
const playerArmor = getElement("playerArmor");
const playerHealth = getElement("playerHealth");
const playerMagic = getElement("playerMagic");
const playerStrength = getElement("playerStrength");
const playerSpeed = getElement("playerSpeed");

// hydra data
const hydraName = getElement("hydraName");
const hydraArmor = getElement("hydraArmor");
const hydraHealth = getElement("hydraHealth");
const hydraMagic = getElement("hydraMagic");
const hydraStrength = getElement("hydraStrength");
const hydraSpeed = getElement("hydraSpeed");

// Round

const round = getElement("nbRound");

//console.log(playerArmor.innerText, playerHealth.innerText);
console.log(parseInt(playerStrength.innerText));
// create action click event function
const attackEvent = (name, func) => document.querySelector(`#${name}`).addEventListener("click", func);

//PhysicAttack
const physicAttackFunc = () => {
  if (playerSpeed.innerText >= hydraSpeed.innerText) {
    //playerAttack
    const dice = Math.floor(Math.random() * 6) * 2;
    const damage = parseInt(playerStrength.innerText) + dice - parseInt(hydraArmor.innerText);
    hydraHealth.textContent = parseInt(hydraHealth.innerText) - damage;

    //hydraAttack
    hydraAttacksFunc();
  } else {
    //hydraAttack
    hydraAttacksFunc();

    //playerAttack
    const dice = Math.floor(Math.random() * 6) * 2;
    const damage = parseInt(playerStrength.innerText) + dice - parseInt(hydraArmor.innerText);
    hydraHealth.textContent = parseInt(hydraHealth.innerText) - damage;
  }
  const nbRound = parseInt(round.innerHTML) + 1;
  round.textContent = nbRound;
};

//MagicAttack
const magicAttackFunc = () => {
  if (playerSpeed.innerText >= hydraSpeed.innerText) {
    //playerAttack
    const dice = Math.floor(Math.random() * 6) * 2;
    const damage = parseInt(playerMagic.innerText) + dice - parseInt(hydraArmor.innerText);
    hydraHealth.textContent = parseInt(hydraHealth.innerText) - damage;

    //hydraAttack
    hydraAttacksFunc();
  } else {
    //hydraAttack
    hydraAttacksFunc();

    //playerAttack
    const dice = Math.floor(Math.random() * 6) * 2;
    const damage = parseInt(playerMagic.innerText) + dice - parseInt(hydraArmor.innerText);
    hydraHealth.textContent = parseInt(hydraHealth.innerText) - damage;
  }
  const nbRound = parseInt(round.innerHTML) + 1;
  round.textContent = nbRound;
};

const armorBoostFunc = () => {
  const dice = Math.floor(Math.random() * 6) * 2;
  const armor = parseInt(playerArmor.innerHTML) + dice * 2;
  playerArmor.textContent = armor;

  const nbRound = parseInt(round.innerHTML) + 1;
  round.textContent = nbRound;
};

const strengthBoostFunc = () => {
  const dice = Math.floor(Math.random() * 6) * 2;
  const strenght = parseInt(playerStrength.innerHTML) + dice * 2;
  playerStrength.textContent = strenght;

  const nbRound = parseInt(round.innerHTML) + 1;
  round.textContent = nbRound;
};

const magicBoostFunc = () => {
  const dice = Math.floor(Math.random() * 6) * 2;
  const magic = parseInt(playerMagic.innerHTML) + dice * 2;
  playerMagic.textContent = magic;

  const nbRound = parseInt(round.innerHTML) + 1;
  round.textContent = nbRound;
};

const speedBoostFunc = () => {
  const dice = Math.floor(Math.random() * 6) * 2;
  const speed = parseInt(playerSpeed.innerHTML) + dice * 2;
  playerSpeed.textContent = speed;

  const nbRound = parseInt(round.innerHTML) + 1;
  round.textContent = nbRound;
};

const healingSpellFunc = () => {
  if (playerSpeed.innerText >= hydraSpeed.innerText) {
    //playerAttack
    const dice = Math.floor(Math.random() * 6) * 2;
    const health = parseInt(playerHealth.innerHTML) + dice * 2;
    playerHealth.textContent = health;

    //hydraAttack
    hydraAttacksFunc();
  } else {
    //hydraAttack
    hydraAttacksFunc();

    //playerAttack
    const dice = Math.floor(Math.random() * 6) * 2;
    const health = parseInt(playerHealth.innerHTML) + dice * 2;
    playerHealth.textContent = health;
  }

  const nbRound = parseInt(round.innerHTML) + 1;
  round.textContent = nbRound;
};

// handle action click event
attackEvent("physicAttack", physicAttackFunc);
attackEvent("magicAttack", magicAttackFunc);
attackEvent("armorBoost", armorBoostFunc);
attackEvent("strengthBoost", strengthBoostFunc);
attackEvent("magicBoost", magicBoostFunc);
attackEvent("speedBoost", speedBoostFunc);
attackEvent("healingSpell", healingSpellFunc);

// Generate Hydra attack
const hydraAttacksFunc = () => {
  const dice = Math.floor(Math.random() * 6) * 2;
  if (dice > 6) {
    const damage = parseInt(hydraStrength.innerHTML) + dice - parseInt(playerArmor.innerHTML);
    playerHealth.textContent = parseInt(playerHealth.innerText) - damage;
  } else {
    const damage = parseInt(hydraMagic.innerHTML) + dice - parseInt(playerArmor.innerHTML);
    playerHealth.textContent = parseInt(playerHealth.innerText) - damage;
  }
};
