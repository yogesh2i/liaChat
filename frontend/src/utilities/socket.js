import { io } from 'socket.io-client';
import {socketurl} from './constants'; 
const socket = io(socketurl); // Initialize the socket instance once

export default socket; // Export the singleton instance