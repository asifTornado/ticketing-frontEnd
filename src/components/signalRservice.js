import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
debugger
const connection = new HubConnectionBuilder()
  .withUrl("http://localhost:5000/chat", {
    skipNegotiation:true,
    transport:HttpTransportType.WebSockets
  })
  .withAutomaticReconnect() // Replace with your SignalR hub URL
  .build();

export default {
  startConnection() {
    debugger
    return connection.start();
  },

  stopConnection() {
    return connection.stop();
  },

  on(eventName, callback) {
    connection.on(eventName, callback);
  },

  off(eventName, callback) {
    connection.off(eventName, callback);
  },

  invoke(methodName, ...args) {
    debugger
    return connection.invoke(methodName, ...args);
  }
};