import axios from 'axios';
import { API_ENDPOINT } from '../config';

// Every call to the backend goes through this client, so the base URL and headers live in one place.
export const requester = axios.create({
  baseURL: API_ENDPOINT,
  headers: { 'Content-Type': 'application/json' },
});
