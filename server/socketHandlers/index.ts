import { Session } from '../models/session';
import { io } from '../';
import GameRound from './gameRound';

const activeGames: Map<string, GameRound> = new Map();

export function runSocketIO() {
  io.of(/^\/.+$/ as any).on('connection', async socket => {
    const sessionId = socket.nsp.name.substring(1);
    console.log('new connection', sessionId, 'socket', socket.conn.id);
    if (!activeGames.has(sessionId)) {
      activeGames.set(sessionId, new GameRound(sessionId));
      await activeGames.get(sessionId).create();
    }
    const connectedGame = activeGames.get(sessionId);
    const { userId } = socket.handshake.query;
    await connectedGame.addUser(userId, socket);
    const dpNames = connectedGame.extractDisplayNames();
    console.log(`  emitting participants: ${dpNames}`)
    io.of(socket.nsp.name).emit('participants', dpNames);
  });
}

// Maintain sessions on memory it could be redis eventually