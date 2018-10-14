import { Session } from '../models/session';
import { io } from '../';
import GameRound from './gameRound';

const activeGames: Map<string, GameRound> = new Map();

export function runSocketIO() {
  io.of(/^\/.+$/ as any).on('connection', async socket => {
    const sessionId = socket.nsp.name.substring(1);
    console.log('new connection', sessionId);
    if (!activeGames.has(sessionId)) {
      activeGames.set(sessionId, new GameRound(sessionId));
      await activeGames.get(sessionId).create();
    }
    const connectedGame = activeGames.get(sessionId);

    socket.on('join', async userId => {
      console.log(`Session$${sessionId} user$${userId} joined`);
      await connectedGame.addUser(userId);
      const dpNames = connectedGame.extractDisplayNames();
      console.log(`  emitting participants: ${dpNames}`)
      io.of(socket.nsp.name).emit('participants', dpNames);
    });

    socket.on('leave', userId => {
      console.log(`Session$${sessionId} user$${userId} left`);
      connectedGame.removeUser(userId);
      const dpNames = connectedGame.extractDisplayNames();
      console.log(`  emitting participants: ${dpNames}`)
      io.of(socket.nsp.name).emit('participants', dpNames);
    });


    // socket.on('name', name => {
    //   console.log('name received', name);
    //   if (!participants[sessionId]) {
    //     participants[sessionId] = [name];
    //   } else {
    //     participants[sessionId].push(name);
    //   }
    //   console.log('about to send', participants[sessionId]);
    //   io.of(socket.nsp.name).emit('participants', participants[sessionId]);
    // });
  });
}

// Maintain sessions on memory it could be redis eventually