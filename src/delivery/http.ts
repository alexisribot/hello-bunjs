import { PokemonUseCase } from "../usecases/pokemon_usecase.ts";

export class PokemonHttpDelivery {
    constructor(private useCase: PokemonUseCase) {}

    async handleRequest(req: Request): Promise<Response> {
        const url = new URL(req.url);
        switch (req.method) {
            case "GET":
                const pokemons = await this.useCase.getAllPokemons();
                return Response.json(pokemons);

            case "POST":
                try {
                    const body = await req.json();
                    await this.useCase.addPokemon(body);
                    return Response.json({ message: "Pokemon added" });
                } catch (error) {
                    return new Response(JSON.stringify({ message: (error as { message: string }).message }), { status: 400 });
                }

            default:
                return Response.json({ message: "Not implemented" });
        }
    }
}
