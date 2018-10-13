import { Session } from '../models/session';
import { io } from '../';

const participants = {};

export function runSocketIO() {
  io.of(/^\/.+$/ as any).on('connection', socket => {
    const sessionId = socket.nsp.name.substring(1);
    console.log('new connection', sessionId);


    socket.on('name', name => {
      console.log('name received', name);
      if (!participants[sessionId]) {
        participants[sessionId] = [name];
      } else {
        participants[sessionId].push(name);
      }
      console.log('about to send', participants[sessionId]);
      io.of(socket.nsp.name).emit('participants', participants[sessionId]);
    });
  });
}

// Maintain sessions on memory it could be redis eventually