import { Message } from "discord.js";
import Command from "./commandInterface";
import config from '../config/botConfig';
import { CommandParser } from "../models/commandParser";
import { escapeSpecialCharacters, replaceMentionWithUsers } from "../utils";

export class SpongeBobCommand implements Command {
  commandNames = ["spongebob"];

  help(commandPrefix: string): string {
    return `Use ${commandPrefix} to spongebobify the text`;
  }

  async run(message: Message): Promise<void> {
    message.content = replaceMentionWithUsers(message);
    const commandParser = new CommandParser(message, config.prefix);

    let spongeText = commandParser.args.map(word => {
      word = this.spongebobify(word);
      word = escapeSpecialCharacters(word);
      return word;
    }).join(' ');

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