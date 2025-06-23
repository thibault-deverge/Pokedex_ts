import chalk from "chalk";

// ------ CONTEXTUAL ------
export function logError(text: string): void {
	console.log(`❌ ${chalk.redBright(text)}`);
}

export function logWarning(text: string): void {
	console.log(chalk.red(text));
}

export function logSeparator(): void {
	console.log(chalk.gray("─────────────────────────────"));
}

// ------- GENERIC -------
export function logCyanBold(text: string): void {
	console.log(chalk.cyanBright.bold(text));
}

export function logBlueBold(text: string): void {
	console.log(chalk.bold.blue(text));
}

export function logYellow(text: string): void {
	console.log(chalk.yellow(text));
}

export function logBrightYellow(text: string): void {
	console.log(chalk.yellowBright(text));
}

export function logMagentaBold(text: string): void {
	console.log(chalk.magentaBright.bold(text));
}

export function logGreenBright(text: string): void {
	console.log(chalk.greenBright(text));
}

export function logGray(text: string): void {
	console.log(chalk.gray(text));
}
