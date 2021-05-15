import { Message } from "discord.js";
import Command from "./commandInterface";

export class SpongeBobCommand implements Command {
  commandNames = ["spongebob"];

  help(commandPrefix: string): string {
    return `Use ${commandPrefix} to spongebobify the text`;
  }

  async run(message: Message, args: string[]): Promise<void> {
    let spongeText = args.map(word => this.spongebobify(word)).join(' ');

    await message.reply(spongeText);
  }

  private spongebobify(text: string): string {
    let resultStr = "";

    for (let i = 0; i < text.length; i++) {
      if (i % 2 == 0) {
        resultStr += text[i].toUpperCase();
      } else {
        resultStr += text[i].toLowerCase();
      }
    }

    return resultStr;
  }
}