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
    const { userId } = socket.handshake.query;
    lobby.addConnection(userId, socket);
    await lobby.addUser(userId);
    const dpNames = lobby.extractDisplayNames();
    console.log(`  emitting participants: ${dpNames}`)
    io.of(socket.nsp.name).emit('participants', dpNames);
    if (lobby.inProgress) {
      lobby.forceSendGameState(userId);
    }

    socket.on('leave', userId => {
      console.log('user left', userId);
      lobby.removeUser(userId);
      if (lobby.participants.size === 0) {
        activeGames.delete(sessionId);
      }
      const dpNames = lobby.extractDisplayNames();
      io.of(socket.nsp.name).emit('participants', dpNames);
    });

    socket.on('startGame', (userId, startState) => {
      console.log('start game requested');
      if (lobby.getHostId() === userId) {
        console.log('starting game');
        lobby.startGame(startState);
      }
    });
  });
}

// Maintain sessions on memory it could be redis eventually