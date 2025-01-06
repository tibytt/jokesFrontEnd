export interface Joke {
    id: number;
    type: string;
    setup: string;
    punchline: string;
}

export type Jokes = Joke[];

export type JokeTypes = string[];
