import { Socket, Server as SocketIOServer } from 'socket.io';
import { getuserNameFromToken } from '../jwt/jwt-service';
import Message from "../models/message";
import message from '../models/message';
import GameSessionEntity, { Card, GameSession } from '../models/GameSession';
import { setNotifNamespace } from '../routes';

interface Message {
  content: string;
  sender: string;
  timestamp: EpochTimeStamp;
}


interface joinGameSession {
  gameSessionId: string;
  username: string;
}

interface SocketError {
  status: number;
  error : string;
}

interface ActionProps {
  type: string;
  selectedCards: Card[];
  username:string;
  gameSessionId: string;
}

interface EndOfTurnProps {
  username: string;
  gameSessionId: string;
}


const users: string[] = [];

interface User {
  id: string;
  socketId: string;
}

class GameEvent {
  eventType: string;
  eventTarget: string;
  eventFrom: string;
  color: string;
  attackSuccess: number;
  constructor(eventType?:string, eventTarget?:string, eventFrom?:string, color?:string, attackSuccess?:number) {
    this.eventType = eventType || '';
    this.eventTarget = eventTarget || '';
    this.eventFrom = eventFrom || '';
    this.color = color || '';
    this.attackSuccess = attackSuccess || 0;
  }
}

enum typeEnum {
  NEUTRAL = "NEUTRAL",
  GRASS = "GRASS",
  GROUND = "GROUND",
  WATER = "WATER",
  ICE = "ICE",
  DRAGON = "DRAGON",
  DARK = "DARK",
  ELECTRIC = "ELECTRIC",
  FIRE = "FIRE"
}

// static function for damage calculation 

function calculateDamage(cardAttacker: Card, cardDefenser: Card, critMultiplier: number): number {
  return (cardAttacker.attack * calculateTypeMultiplicator(cardAttacker, cardDefenser) * critMultiplier - cardDefenser.defense);
}


function calculateTypeMultiplicator(cardAttacker, cardDefenser): number {
  let multiplicator = 1;
  // type advantage is damage * 1.5
  // type disadvantage is datam * 0.5
  // type neutrality is damage * 1
  switch(cardAttacker.mainType) {
    case typeEnum.NEUTRAL:
      switch(cardDefenser.mainType) {
        case typeEnum.NEUTRAL:
          multiplicator = 1;
          break;
        case typeEnum.GRASS:
          multiplicator = 1;
          break;
        case typeEnum.GROUND:
          multiplicator = 1;
          break;
        case typeEnum.WATER:
          multiplicator = 1;
          break;
        case typeEnum.ICE:
          multiplicator = 1;
          break;
        case typeEnum.DRAGON:
          multiplicator = 1;
          break;
        case typeEnum.DARK:
          multiplicator = 0.5;
          break;
        case typeEnum.ELECTRIC:
          multiplicator = 1;
          break;
        case typeEnum.FIRE:
          multiplicator = 1;
          break;    
      }
      break;
    case typeEnum.FIRE:
      switch(cardDefenser.mainType) {
        case typeEnum.NEUTRAL:
          multiplicator = 1;
          break;
        case typeEnum.GRASS:
          multiplicator = 1.5;
          break;
        case typeEnum.GROUND:
          multiplicator = 1.2;
          break;
        case typeEnum.WATER:
          multiplicator = 0.5;
          break;
        case typeEnum.ICE:
          multiplicator = 1.5;
          break;
        case typeEnum.DRAGON:
          multiplicator = 1;
          break;
        case typeEnum.DARK:
          multiplicator = 1;
          break;
        case typeEnum.ELECTRIC:
          multiplicator = 0.8;
          break;
        case typeEnum.FIRE:
          multiplicator = 1;
          break;    
      }
    break;
    case typeEnum.GRASS:
      switch(cardDefenser.mainType) {
        case typeEnum.NEUTRAL:
          multiplicator = 1;
          break;
        case typeEnum.GRASS:
          multiplicator = 1;
          break;
        case typeEnum.GROUND:
          multiplicator = 1.5;
          break;
        case typeEnum.WATER:
          multiplicator = 0.8;
          break;
        case typeEnum.ICE:
          multiplicator = 1;
          break;
        case typeEnum.DRAGON:
          multiplicator = 1;
          break;
        case typeEnum.DARK:
          multiplicator = 1;
          break;
        case typeEnum.ELECTRIC:
          multiplicator = 1.2;
          break;
        case typeEnum.FIRE:
          multiplicator = 0.5;
          break;    
      }
      break;
    case typeEnum.GROUND:
      switch(cardDefenser.mainType) {
        case typeEnum.NEUTRAL:
          multiplicator = 1;
          break;
        case typeEnum.GRASS:
          multiplicator = 0.5;
          break;
        case typeEnum.GROUND:
          multiplicator = 1;
          break;
        case typeEnum.WATER:
          multiplicator = 1.2;
          break;
        case typeEnum.ICE:
          multiplicator = 1;
          break;
        case typeEnum.DRAGON:
          multiplicator = 1;
          break;
        case typeEnum.DARK:
          multiplicator = 1;
          break;
        case typeEnum.ELECTRIC:
          multiplicator = 1.5;
          break;
        case typeEnum.FIRE:
          multiplicator = 0.8;
          break;    
      }
      break;
    case typeEnum.WATER:
      switch(cardDefenser.mainType) {
        case typeEnum.NEUTRAL:
          multiplicator = 1;
          break;
        case typeEnum.GRASS:
          multiplicator = 1.2;
          break;
        case typeEnum.GROUND:
          multiplicator = 0.8;
          break;
        case typeEnum.WATER:
          multiplicator = 1;
          break;
        case typeEnum.ICE:
          multiplicator = 1;
          break;
        case typeEnum.DRAGON:
          multiplicator = 1;
          break;
        case typeEnum.DARK:
          multiplicator = 1;
          break;
        case typeEnum.ELECTRIC:
          multiplicator = 0.5;
          break;
        case typeEnum.FIRE:
          multiplicator = 1.5;
          break;    
      }
      break;
    case typeEnum.ICE:
      switch(cardDefenser.mainType) {
        case typeEnum.NEUTRAL:
          multiplicator = 1;
          break;
        case typeEnum.GRASS:
          multiplicator = 0.8;
          break;
        case typeEnum.GROUND:
          multiplicator = 1;
          break;
        case typeEnum.WATER:
          multiplicator = 0.8;
          break;
        case typeEnum.ICE:
          multiplicator = 1;
          break;
        case typeEnum.DRAGON:
          multiplicator = 1.5;
          break;
        case typeEnum.DARK:
          multiplicator = 1.2;
          break;
        case typeEnum.ELECTRIC:
          multiplicator = 1;
          break;
        case typeEnum.FIRE:
          multiplicator = 0.5;
          break;    
      }
      break;
    case typeEnum.DRAGON:
      switch(cardDefenser.mainType) {
        case typeEnum.NEUTRAL:
          multiplicator = 1.2;
          break;
        case typeEnum.GRASS:
          multiplicator = 1;
          break;
        case typeEnum.GROUND:
          multiplicator = 1;
          break;
        case typeEnum.WATER:
          multiplicator = 1;
          break;
        case typeEnum.ICE:
          multiplicator = 0.5;
          break;
        case typeEnum.DRAGON:
          multiplicator = 1;
          break;
        case typeEnum.DARK:
          multiplicator = 1.5;
          break;
        case typeEnum.ELECTRIC:
          multiplicator = 1;
          break;
        case typeEnum.FIRE:
          multiplicator = 0.8;
          break;    
      }
      break;
    case typeEnum.DARK:
      switch(cardDefenser.mainType) {
        case typeEnum.NEUTRAL:
          multiplicator = 1.5;
          break;
        case typeEnum.GRASS:
          multiplicator = 1;
          break;
        case typeEnum.GROUND:
          multiplicator = 1;
          break;
        case typeEnum.WATER:
          multiplicator = 1;
          break;
        case typeEnum.ICE:
          multiplicator = 0.8;
          break;
        case typeEnum.DRAGON:
          multiplicator = 0.5;
          break;
        case typeEnum.DARK:
          multiplicator = 1;
          break;
        case typeEnum.ELECTRIC:
          multiplicator = 1;
          break;
        case typeEnum.FIRE:
          multiplicator = 1;
          break;    
      }
      break;
    case typeEnum.ELECTRIC:
      switch(cardDefenser.mainType) {
        case typeEnum.NEUTRAL:
          multiplicator = 1;
          break;
        case typeEnum.GRASS:
          multiplicator = 0.8;          
          break;
        case typeEnum.GROUND:
          multiplicator = 0.5;
          break;
        case typeEnum.WATER:
          multiplicator = 1.5;
          break;
        case typeEnum.ICE:
          multiplicator = 1;
          break;
        case typeEnum.DRAGON:
          multiplicator = 1;
          break;
        case typeEnum.DARK:
          multiplicator = 1;
          break;
        case typeEnum.ELECTRIC:
          multiplicator = 1;
          break;
        case typeEnum.FIRE:
          multiplicator = 1.2;
          break;    
      }
    break;
  }
  return multiplicator;
}

function getCriticalCoef(cardAttacker: Card, cardDefenser: Card): number {
  const randomBinary: number = Math.floor(Math.random() * 101);
  return randomBinary <= 90 ? 1 : 2;
}

function didHeDodge(): boolean {
  const randomBinary: number = Math.floor(Math.random() * 101);
  console.log(randomBinary, randomBinary >= 95);
  return randomBinary >= 95;
}

const privateUsers = new Map<string, User>();

export const globalUsers = new Map<string, User>();

export const initSocket = (server: any) => {
  
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });
  
  // chat namespace =>
  const chatNamespace = io.of("/chat");
  
  chatNamespace.on('connection', (socket) => {
    // console.log('Client connected:', socket.id);
    if (!users.find(el => el === socket.handshake.auth.username)) {
      users.push(socket.handshake.auth.username);
    }

    socket.on('join', (userId: string) => {
      // ?
    });

    socket.on("private-message", ({ sender, receiver, message }) => {
      console.log("received", sender, receiver, message);
      const receiverSocketId = users[receiver];
      if (receiverSocketId) {
        socket.to(receiverSocketId).emit("receive-message", { sender, message });
      }
    });

    socket.on("send-all-players", (scoket) => {
      chatNamespace.emit("player-list", users);
    });




    socket.on("disconnect", () => {
      
      for (let i = 0; i < users.length; i++) {
        if (users[i] === socket.handshake.auth.username) {
          delete users[i];
          break;
        }
      }
      console.log("User disconnected:", socket.id);
      chatNamespace.emit("player-list", users);
    });

    socket.on("message", async (data: Message) => {
      // const username: string = getuserNameFromToken(data.sender);
      const username = data.sender;
      console.log("Message received:", data, username);
      try {
 
        // Save the message to the database
        await Message.create({
          content: data.content,
          sender: username, // Adjust according to the payload in your token
          createdAt: data.timestamp
        });
      } catch (error) {
        console.error("Error saving message:", error);
      }
      // Broadcast the message to all connected clients
      chatNamespace.emit("message", {
        content: data.content,
        sender: username,
        timestamp: data.timestamp,
      });
      
    });

  });

  // game namespace => 
  const gameNamespace = io.of("/game");

  gameNamespace.on('connection', async (socket) => {
    console.log(`A player connected: ${socket.id}`);

    socket.on('joinGame', async ({gameSessionId, username}: joinGameSession) => {
      console.log(`gameSessionId received: ${gameSessionId}, \nusername received: ${username}\n`);

      let gameSession = await GameSessionEntity.findOne({"sessionId": gameSessionId});
      console.log(`gamession in db: ${gameSession}`);
      if (!gameSession) {
        console.log("gameSession not found!");
        socket.emit("session-not-found", {status: 404, error: 'Game session not found'} as SocketError);
        return
      }

      if (!gameSession?.players) {
        console.log("instanciate empty players array");
        gameSession.players = [];
      }

      if (!gameSession?.players.find(player => player.playerName === username)) {
        gameSession.players.push({playerId: socket.id, playerName: username, status: 'connected', cards:[], actionPoint: 0});
        gameSession.currentNbPlayers += 1;
        try {
          await gameSession.save();
        } catch (err) {
          console.log(`error when trying to save gameSession: ${err.message}`);
        }
      }
      socket.join(gameSession.sessionId);
      console.log(`${username} joined game ${gameSessionId}`)
      // Too much player etc ...

      // 
      gameNamespace.to(gameSessionId).emit('playerJoined', { gameSession, username});
      socket.emit('gameState', gameSession);
    });

    socket.on('markAsReady', async ({username, gameSessionId}: joinGameSession) => {
      // user is ready
      console.log(username, gameSessionId);
      let gameSession = await GameSessionEntity.findOne({"sessionId": gameSessionId});
      if (gameSession === null) {
        console.log("Game session not found");
      }
      gameSession.players.forEach(player => {
        if (player.playerName === username) {
          player.status = 'ready'
        }
      });
      try {
        const everyPlayerAreReady: boolean = gameSession.players.filter(p => p.status !== 'ready').length === 0 && gameSession.players.length === gameSession.capacity; 
        if (everyPlayerAreReady) {
          // every player are ready
          gameSession.status = 'in-progress';
          await gameSession.save();
          gameNamespace.to(gameSessionId).emit("game-ready", {gameSession})
        } else {
          await gameSession.save();
          gameNamespace.to(gameSessionId).emit('playerIsReady', {gameSession, username});
        }

      } catch(err) {
        socket.emit("error-mongo", {status: 500, error: 'Could not save player infos'} as SocketError);
      }
    });

    socket.on('setPlayerInfo', async ({username, gameSessionId, cards}) => {
      console.log("\nusername: ", username, "\ngameSessionId:", gameSessionId);
      const gameSession = await GameSessionEntity.findOne({"sessionId": gameSessionId});
      const playerInGameSession = gameSession.players.find(el => el.playerName === username);
      playerInGameSession.cards = [...cards];
      playerInGameSession.cards.forEach(el => {
        el.maxAttack = el.attack;
        el.maxDefense = el.defense;
        el.maxHealth = el.health;
        el.owner = username;
      });
      let nbPlayerReady = 0;
      gameSession.players.forEach(p => {
        if (p?.cards?.length !== 0){
          // card were set, player is ready
          nbPlayerReady ++;
        }
      });
      if (nbPlayerReady === gameSession.capacity) {
        // all player are ready
        // decide who's gonna play first =>
        const randomBinary: number = Math.floor(Math.random() * 2);
        gameSession.playerWhoCanPlay = gameSession.players[randomBinary].playerName;
        gameSession.players[randomBinary].actionPoint = 1;
        await gameSession.save();
        gameNamespace.emit("setGame", {
          player1: gameSession.players[0],
          player2: gameSession.players[1],
          gameSession: gameSession
        });
      } else {
        await gameSession.save();
      }
    });

    socket.on("action", async ({type, selectedCards, username, gameSessionId}: ActionProps) => {
      // console.log("\ntype: ", type, "\ngameSessionId: ", gameSessionId, "\nusername: ", username);

      const gameSession = await GameSessionEntity.findOne({"sessionId": gameSessionId});
      if (gameSession.playerWhoCanPlay !== username) {
        return;
      }      
      const playerWhoAttacked = gameSession.players.find(el => el.playerName === username);
      const playerAttacked = gameSession.players.find(el => el.playerName !== username)
      // console.log(`playerWhoAttacked: ${playerWhoAttacked}`);  
      if (playerWhoAttacked.actionPoint <= 0) {
        // console.log("bizarre");
        return;
      }
      const adversaryCard: Card[] = playerAttacked.cards

      const attackerCard = playerWhoAttacked.cards.find(el => el.id === selectedCards[0].id);
      const defenserCard = adversaryCard.find(el => el.id === selectedCards[1].id);

      // console.log(attackerCard.name," attacked ", defenserCard.name, `${attackerCard.attack} - ${defenserCard.defense} = ${attackerCard.attack - defenserCard.defense}`);
      
      const gameEventToEmit = new GameEvent("ATTACK", defenserCard.name, attackerCard.name, "", 1);
      // add dodge chance, critical rate etc... 
      if (didHeDodge()) {
        gameEventToEmit.eventType = "DODGE";
      } else {
        const criticalCoef = getCriticalCoef(attackerCard, defenserCard);

        
        const typeAdvantage = calculateTypeMultiplicator(attackerCard, defenserCard)
        gameEventToEmit.attackSuccess = typeAdvantage;
        const damageDealth = calculateDamage(attackerCard, defenserCard, criticalCoef);
        // const damageDealth = attackerCard.attack - defenserCard.defense;
        defenserCard.health -= damageDealth > 0 ? damageDealth : 0;
        if (criticalCoef !== 1) {
          gameEventToEmit.eventType = "CRITICAL";
        }
      }
            
      if (defenserCard.health < 0) {
        defenserCard.health = 0;
        // atleast one card is dead, check if all the others are :
        let deadCard: number = 0;
        adversaryCard.forEach(card => {
          if (card.health <= 0) {
            deadCard++;
          }
        });
        // console.log(`deadCard: ${deadCard} - advseraryCard.length: ${adversaryCard.length}`);
        if (deadCard === adversaryCard.length) {
          // username won
          // console.log("winner");
          gameSession.status = "finished";
          gameSession.elapsedTurn += 1;
          gameNamespace.to(gameSessionId).emit("gameResult", {winner: username, loser: playerAttacked.playerName, gameSession: gameSession});
          await gameSession.save();
          // send info to backend for synchro =>S
          return;
        }
      }
      playerWhoAttacked.actionPoint -= 1;

      //
      await gameSession.save();
      // emit infos
      
      // event for frontend display:
      gameNamespace.to(gameSession.sessionId).emit('actionResult', {
        player1: gameSession.players[0],
        player2: gameSession.players[1],
        gameSession: gameSession,
        gameEvent: gameEventToEmit
      });

    });

    socket.on("endOfTurn", async({username, gameSessionId}: EndOfTurnProps) => {
      const gameSession = await GameSessionEntity.findOne({"sessionId": gameSessionId});
      
      // const playerWhoPlayed = gameSession.players.find(el => el.playerName === username);      

      
      const playerToPlay = gameSession.players.find(el => el.playerName !== username);
      playerToPlay.actionPoint += 1;
      gameSession.elapsedTurn +=1;
      gameSession.playerWhoCanPlay = playerToPlay.playerName;
      await gameSession.save();
      gameNamespace.to(gameSessionId).emit("turnEnded", {username, gameSessionId, gameSession});

    })

    socket.on("gameEnded", async(gameSessionId: string) => {
      // clean gameSession after it has ended, the historic is on the springboot backend
      await GameSessionEntity.deleteOne({"sessionId": gameSessionId});

    })

    // Handle disconnect =>
    socket.on('disconnect', async() => {
      console.log(`Player disconnected with: ${socket.id}`);
      const gameSession = await GameSessionEntity.findOne({ "players.playerId ": socket.id });
      if (gameSession) {
        const playerWhoLeft = gameSession.players.find(p => p.playerId === socket.id);
        gameSession.players = gameSession.players.filter(player => player.playerId === socket.id);
        gameSession.currentNbPlayers -= 1;
        await gameSession.save();
        gameNamespace.to(gameSession.sessionId).emit('playerleft',
          {
            socketId: socket.id,
            username: playerWhoLeft.playerName
          });
      }
    })

  });


  // private namespace =>
  const privateChatNamespace = io.of("/private");

  privateChatNamespace.on('connection', (socket: Socket)=> {
    console.log(`User connected to private namespace: ${socket.id}`);
    socket.on("register", (username: string) => {
      console.log(`User registered: ${username} with socket ID ${socket.id}`);
      privateUsers.set(username,
        {
          id: username,
          socketId: socket.id
        });
        console.log(`User registered: ${username} - Socket: ${socket.id}`);
    })
    socket.on("private-message", ({senderId, receiverId, message}) =>  {
      console.log(message);
      const receiver = privateUsers.get(receiverId);
      if (receiver) {
        privateChatNamespace.to(receiver.socketId).emit("receive-message", {senderId: senderId, message: {
          content: message.content,
          timestamp: message.timestamp,
          sender: message.sender
        }});
      }
    });
    socket.on('disconnect', ()=>{
      privateUsers.forEach((user, userId) => {
        if (user.socketId === socket.id) {
          privateUsers.delete(userId);
        }
      });
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  // notif namespace =>
  const notifNamespace = io.of('/notif');
  setNotifNamespace(notifNamespace);

  notifNamespace.on('connection', (socket: Socket) => {
    console.log('Un client est connecté au namespace /notif');

    socket.on("register", (username: string) => {
      console.log(`User registered: ${username} with socket ID ${socket.id}`);
      globalUsers.set(username,
        {
          id: username,
          socketId: socket.id
        });
        console.log(`User registered: ${username} - Socket: ${socket.id}`);
    })
  
    // Gérer la déconnexion du client
    socket.on('disconnect', () => {
      console.log('Client déconnecté du namespace /notif');
    });
  });

  return io;
};
