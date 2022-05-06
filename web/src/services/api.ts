import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3333';

export const api = axios.create({
	baseURL: BACKEND_URL,
});
