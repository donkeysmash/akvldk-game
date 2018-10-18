import { Session } from '../models/session';
import { io } from '../';
import Lobby from './lobby';

const activeGames: Map<string, Lobby> = new Map();

export function runSocketIO() {
  io.of(/^\/.+$/ as any).on('connection', async socket => {
    const sessionId = socket.nsp.name.substring(1);
    console.log('new connection', sessionId, 'socket', socket.conn.id);
    if (!activeGames.has(sessionId)) {
      activeGames.set(sessionId, new Lobby(sessionId));
      await activeGames.get(sessionId).create();
    }
    const lobby = activeGames.get(sessionId);
    if (!lobby.isLocked) {
      const { userId } = socket.handshake.query;
      lobby.addConnection(userId, socket);
      await lobby.addUser(userId);
      const dpNames = lobby.extractDisplayNames();
      console.log(`  emitting participants: ${dpNames}`)
      io.of(socket.nsp.name).emit('participants', dpNames);
    }

    socket.on('leave', userId => {
      if (!lobby.isLocked) {
        lobby.removeUser(userId);
      }
      const dpNames = lobby.extractDisplayNames();
      io.of(socket.nsp.name).emit('participants', dpNames);
    });

    socket.on('startGame', (userId, startState) => {
      console.log('start game requested');
      if (lobby.getHostId() === userId) {
        console.log('starting game');
        lobby.lock();
        lobby.startGame(startState);
      }
    });
  });
}

// Maintain sessions on memory it could be redis eventually