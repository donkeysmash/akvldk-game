import { Room, Client } from 'colyseus';

class MafiaRoom extends Room {
  maxClients = 2;
  onMessage(client: Client, data) {
    console.log(client, data);
  }

  onJoin(client: Client) {
    console.log(client);
  }


}

export default MafiaRoom;