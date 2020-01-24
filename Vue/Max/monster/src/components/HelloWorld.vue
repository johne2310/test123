<template>
  <div id="app">
    <section class="row">
      <div class="small-6 columns">
        <h1 class="text-center">YOU</h1>
        <div class="healthbar" :class="{ dead: isDeadPlayer }">
          <div
            class="healthbar text-center"
            style="background-color: green; margin: 0; color: white;"
            :style="{ width: playerHealth + '%' }"
          >
            {{ playerHealth }}
          </div>
        </div>
      </div>
      <div class="small-6 columns">
        <h1 class="text-center">MONSTER</h1>
        <div class="healthbar" :class="{ dead: isDeadMonster }">
          <div
            class="healthbar text-center"
            style="background-color: green; margin: 0; color: white;"
            :style="{ width: monsterHealth + '%' }"
          >
            {{ monsterHealth }}
          </div>
        </div>
      </div>
    </section>
    <section v-show="!isGameRunning" class="row controls">
      <div class="small-12 columns">
        <button @click="startGame" id="start-game">START NEW GAME</button>
      </div>
    </section>
    <section class="row controls" v-if="isGameRunning">
      <div class="small-12 columns">
        <button @click="attack" id="attack">ATTACK</button>
        <button @click="specialAttack" id="special-attack">
          SPECIAL ATTACK
        </button>
        <button @click="heal" id="heal">HEAL</button>
        <button id="give-up" @click="giveUp">GIVE UP</button>
      </div>
    </section>
    <section class="row log" v-if="isGameRunning">
      <div class="small-12 columns">
        <ul>
          <li
            v-for="(log, index) in eventLog"
            :key="index"
            :class="{
              'player-turn': log.isPlayer,
              'monster-turn': !log.isPlayer,
            }"
          >
            Action: {{ log.character }} {{ log.action }} | Value:
            {{ log.health }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: function() {
    return {
      playerHealth: 20,
      monsterHealth: 20,
      isGameRunning: false,
      eventLog: [],
      monsterLog: [],
      monsterDamage: 0,
      playerDamage: 0,
      multiple: 2,
      winner: '',
      action: '',
      isDeadMonster: false,
      isDeadPlayer: false,
    };
  },
  methods: {
    startGame() {
      this.isGameRunning = true;
      this.isDeadMonster = false;
      this.isDeadPlayer = false;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.eventLog = [];
    },
    giveUp() {
      this.isGameRunning = false;
      this.isDead = false;
      this.eventLog = [];
    },
    attack(event) {
      this.action = 'attacked';
      this.calculateScore(event.target.id);
    },
    specialAttack(event) {
      this.action = 'special-attacked';
      this.calculateScore(event.target.id);
    },
    heal(event) {
      //set values for attack effect
      console.log(event.target.id);
      this.action = 'healed';
      this.calculateScore(event.target.id);
    },
    calculateScore(id) {
      id = event.target.id;
      this.monsterDamage = Math.floor(Math.random() * 20);
      this.playerDamage = Math.floor(Math.random() * 20);

      if (id === 'special-attack') {
        // use multiple to calculate special attack values
        this.monsterDamage *= this.multiple;
        this.playerDamage *= this.multiple;
        console.log(this.playerDamage, this.monsterDamage);
      } else if (id === 'healing') {
        console.log('Healing');
        this.monsterDamage = -this.monsterDamage;
        this.playerDamage = -this.playerDamage;
        console.log(this.playerDamage, this.monsterDamage);
      }
      setTimeout(() => {
        this.updateScore(id);
      }, 1000);
    },
    updateScore(id) {
      // check if both parties are killed
      console.log('id from UpdateScore: ', id);
      console.log('Pre update scores', this.playerHealth, this.monsterHealth);
      if (
        this.monsterHealth - this.monsterDamage < 1 &&
        this.playerHealth - this.playerDamage < 1
      ) {
        this.isDeadMonster = true;
        this.isDeadPlayer = true;
        this.monsterHealth = 0;
        this.playerHealth = 0;
        this.winner = 'Draw';
        this.endGame();
        console.log('Both parties are dead');
      }

      //player health can't be > 100
      if (id === 'heal' && this.playerHealth + this.playerDamage >= 100) {
        this.playerHealth = 100;
      } else if (id === 'heal') {
        this.playerHealth += this.playerDamage;
      }

      // //monster health
      if (id === 'heal' && this.monsterHealth + this.monsterDamage >= 100) {
        this.monsterHealth = 100;
      } else if (id === 'heal') {
        this.monsterHealth += this.monsterDamage;
      }

      if (this.monsterHealth - this.monsterDamage < 1) {
        this.isDeadMonster = true;
        this.monsterHealth = 0;
        this.winner = 'Player';
        this.endGame();
      } else if (this.playerHealth - this.attackPerson < 1) {
        this.isDeadPlayer = true;
        this.playerHealth = 0;
        this.winner = 'Monster';
        this.endGame();
      } else if (id !== 'heal') {
        //calculate new health values (indicators will adjust automatically)
        console.log('id: ', id);
        console.log('update not heal scores');
        this.monsterHealth -= this.monsterDamage;
        this.playerHealth -= this.playerDamage;
      }
      console.log('Post update scores', this.playerHealth, this.monsterHealth);
      this.updateLog();
    },
    endGame() {
      setTimeout(() => {
        if (
          confirm(
            `Game is over! Winner was ${this.winner}. Do you want to play again?`
          )
        ) {
          this.startGame();
        }
      }, 500);
    },
    updateLog() {
      //add attack values to eventLog
      this.eventLog.push(
        {
          health: -this.playerDamage,
          isPlayer: true,
          character: 'Player',
          action: this.action,
        },
        {
          health: -this.monsterDamage,
          isPlayer: false,
          character: 'Monster',
          action: this.action,
        }
      );

      // console.log(this.eventLog);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-center {
  text-align: center;
}

.healthbar {
  width: 80%;
  height: 40px;
  background-color: #eee;
  margin: auto;
  transition: width 500ms;
}
.dead {
  background-color: rgb(224, 17, 17);
}

.controls,
.log {
  margin-top: 30px;
  text-align: center;
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: 0px 3px 6px #ccc;
}

.turn {
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 22px;
}

.log ul {
  list-style: none;
  font-weight: bold;
  text-transform: uppercase;
  background-color: white;
}

.log ul li {
  margin: 5px;
}

.log ul .player-turn {
  color: blue;
  background-color: #e4e8ff;
}

.log ul .monster-turn {
  color: red;
  background-color: #ffc0c1;
}

button {
  font-size: 20px;
  background-color: #eee;
  padding: 12px;
  box-shadow: 0 1px 1px black;
  margin: 10px;
}

#start-game {
  background-color: #aaffb0;
}

#start-game:hover {
  background-color: #76ff7e;
}

#attack {
  background-color: #ff7367;
}

#attack:hover {
  background-color: #ff3f43;
}

#special-attack {
  background-color: #ffaf4f;
}

#special-attack:hover {
  background-color: #ff9a2b;
}

#heal {
  background-color: #aaffb0;
}

#heal:hover {
  background-color: #76ff7e;
}

#give-up {
  background-color: #ffffff;
}

#give-up:hover {
  background-color: #c7c7c7;
}
</style>
