import { Database } from "bun:sqlite";
import { Pokemon } from "../domain/pokemon.ts";

export class PokemonUseCase {
    constructor(private db: Database) {}

    async getAllPokemons(): Promise<Pokemon[]> {
        return this.db.query("SELECT * FROM pokemons").all() as Pokemon[];
    }

    async addPokemon(pokemon: Pokemon): Promise<void> {
        const existingPokemon = await this.db.query("SELECT name FROM pokemons WHERE name = $name").get({ $name: pokemon.name });

        if (!existingPokemon) {
            this.db.query("INSERT INTO pokemons (name, type) VALUES ($name, $type)").run({
                $name: pokemon.name,
                $type: pokemon.type,
            });
        } else {
            throw new Error("Pokemon already exists");
        }
    }
}
