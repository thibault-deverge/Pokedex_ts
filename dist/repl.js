import { commandExit } from "./commands/index.js";
import { cleanInput, logError } from "./utils/index.js";
/**
 * Starts a REPL interface that processes user commands from the registry.
 * @param state - Contains readline interface and command registry
 */
export function startREPL(state) {
    const { rl, registry } = state;
    rl.prompt();
    rl.on("line", async (input) => {
        const words = cleanInput(input);
        if (words.length !== 0) {
            if (words[0]) {
                const commands = registry;
                const command = commands[words[0]];
                if (command) {
                    await command.callback(state, ...words.slice(1));
                }
                else {
                    logError("Unknown command. Type 'help' to see available options.");
                }
            }
        }
        rl.prompt();
    });
    rl.on("close", () => {
        console.log("");
        commandExit(state);
    });
}
