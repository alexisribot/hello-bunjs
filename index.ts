import Database from "bun:sqlite";
import { PokemonHttpDelivery } from "./src/delivery/http";
import { PokemonUseCase } from "./src/usecases/pokemon_usecase";

const db = new Database("db.sqlite", { create: true });

db.query("CREATE TABLE IF NOT EXISTS pokemons (id INTEGER PRIMARY KEY, name TEXT, type TEXT)").run();

const useCase = new PokemonUseCase(db);
const delivery = new PokemonHttpDelivery(useCase);

const server = Bun.serve({
    port: 8081,
    async fetch(req) {
        return await delivery.handleRequest(req);
    },
});

console.log(`Listening on http://localhost:${server.port} ...`);
