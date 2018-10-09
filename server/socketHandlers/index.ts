import { io } from '../';

export function runSocketIO() {
  io.on('connection', socket => {
    socket.emit('hello', 'can you hear me');
    socket.on('donkey', data => {
      console.log('donkey', data);
    });
    socket.on('smash', data => {
      console.log('smash', data);
    });
  });
}