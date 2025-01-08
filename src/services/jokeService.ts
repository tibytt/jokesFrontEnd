import axios from 'axios';
 import { Joke, Jokes, JokeTypes } from '../types/jokeTypes'
const baseUrl = 'https://official-joke-api.appspot.com';
const localUrl = 'http://localhost:3005';

export default {
    // Fetch a single random joke
    async getRandomJoke(): Promise<Joke> {
        try {
          const response = await axios.get(`${baseUrl}/random_joke`);
          return response.data; 
        } catch (error) {
          throw new Error('Failed to fetch random joke');
        }
      },
  
    // Fetch more than one random jokes
    async getRandomJokes(count: number): Promise<Jokes> {
        try {
          const response = await axios.get(`${baseUrl}/jokes/random/${count}`);
          return response.data;
        } catch (error) {
          throw new Error('Failed to fetch random jokes');
        }
      },
  
    // Fetch joke types
    async getJokeTypes(): Promise<JokeTypes> {
        try {
          const response = await axios.get(`${baseUrl}/types`);
          return response.data;
        } catch (error) {
          throw new Error('Failed to fetch joke types');
        }
      }
    ,
  
    // Fetch jokes by type
    async getJokesByType(type: string, count: number ) {
      const response = await axios.get(`${localUrl}/jokes/${type}/${count}`);
      return response.data;
    },
  
    // Fetch ten jokes
    async getTenJokes() {
      const response = await axios.get(`${baseUrl}/random_ten`);
      return response.data;
    },
      
   // add joke
    async addJoke(joke: { type: string; setup: string; punchline: string }) {
      try {
        const response = await axios.post('http://localhost:3005/jokes/add', joke);
        return response.data;
      } catch (error) {
        throw new Error('Failed to add joke');
  }
}, 
  // delete joke
    async deleteJoke(id: number) {
      try {
        const response = await axios.delete(`${localUrl}/jokes/${id}`);
        return response.data;
      } catch (error) {
        throw new Error('Failed to delete joke');
      }
    },
// get singular joke
    async getJokeById(id: number): Promise<Joke> {
        try {
          const response = await axios.get(`${localUrl}/jokes/${id}`);
          return response.data;
        } catch (error) {
          console.error('Error fetching joke by id:', error);
          throw new Error('Failed to fetch joke');
        }
      },
//get all jokes      
    async getAllJokes(): Promise<Joke[]> {
      try {
        const response = await axios.get(`${localUrl}/jokes`);
        return response.data;
      } catch (error) {
        console.error('Error fetching all jokes:', error);
        throw error;
      }
    },  
  };