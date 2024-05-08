/* eslint-disable prettier/prettier */
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { RiderService } from './rider.service';

@WebSocketGateway() // WebSocket gateway declaration
export class LocationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() // Provides the Socket.IO server instance
  server: Server;

  constructor(private readonly ridersService: RiderService) {}

  // Handle when a client connects to the WebSocket server
  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  // Handle when a client disconnects
  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  // Handle location update messages from clients
  @SubscribeMessage('updateLocation')
  async handleLocationUpdate(@MessageBody() data: { riderId: string; longitude: number; latitude: number }) {
    // Update the rider's location using a service
    await this.ridersService.updateRiderLocation(data.riderId, data.longitude, data.latitude);

    // Broadcast the updated location to all connected clients
    this.server.emit('riderLocationUpdate', {
      riderId: data.riderId,
      longitude: data.longitude,
      latitude: data.latitude,
    });
  }
}
