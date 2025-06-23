import figlet from "figlet";
import { startREPL } from "./repl.js";
import { initState } from "./state.js";
import { logBrightYellow, logError, logYellow } from "./utils/index.js";
function main() {
    figlet("Pokedex", (_, data) => {
        if (!data) {
            logError("Failed to load title.");
            return;
        }
        logYellow(data);
        logBrightYellow("📘 Welcome to the Pokedex!");
        startREPL(initState());
    });
}
main();
