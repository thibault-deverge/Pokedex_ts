# 🧭 Pokédex CLI

A colorful and interactive command-line Pokédex built with TypeScript and Node.js!  
Search, catch, inspect, and list Pokémon — all in your terminal. Inspired by retro Pokémon games.

## 🚀 Features

- 🎨 Beautiful terminal output using Chalk & Figlet
- 🔎 Explore Pokémon locations and discover wild Pokémon
- 🧢 Catch Pokémon with a probability system based on experience
- 📘 Inspect caught Pokémon stats and types
- 📂 In-memory cache system to reduce API calls
- 📜 REPL interface for a natural command flow

## 📦 Commands

- `map`: Lists the next set of locations from the Pokémon world
- `explore <location>`: Lists Pokémon available in the specified area
- `catch <pokemon>`: Attempts to catch a Pokémon and adds it to your Pokédex
- `inspect <pokemon>`: View stats and type of a caught Pokémon
- `pokedex`: List all Pokémon you’ve caught
- `help`: Show available commands
- `exit`: Exit the Pokédex

## 🧪 Testing

Unit tests are written using [Vitest].  
To run tests:

```bash
npm run test
```

## 🛠️ Setup

1. Clone the repo  
2. Install dependencies:
```bash
npm install
```
3. Start the CLI:
```bash
npm run dev
```

> Requires Node.js 18+

## 🌐 Powered by

- [PokeAPI](https://pokeapi.co)
- [Chalk](https://www.npmjs.com/package/chalk)
- [Figlet](https://www.npmjs.com/package/figlet)
- [Vitest](https://vitest.dev)

## 📁 Project Structure

```
src/
├── commands/        # All CLI command implementations
├── utils/           # Printers, logging helpers, input cleaner
├── types/           # Shared TypeScript types
├── pokeapi.ts       # API wrapper with cache support
├── pokecache.ts     # In-memory expiring cache
├── state.ts         # Global state manager
├── main.ts          # Entry point
```

## 🧙 Author

Made with love and caffeine by [Thibault](https://github.com/thibaultdeverge)

## 📜 License

MIT
