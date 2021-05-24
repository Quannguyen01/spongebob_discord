import { Message, MessageAttachment } from "discord.js";
import { CommandParser } from "../models/commandParser";
import Command from "./commandInterface";
import config from '../config/botConfig';

export class SpongeBobImgCommand implements Command {
  commandNames = ["sbimg", "mockimg"];

  help(commandPrefix: string): string {
    return `Use ${commandPrefix} to spongebobify the text`;
  }

  async run(message: Message): Promise<void> {
    const commandParser = new CommandParser(message, config.prefix);

    let spongeTexts = commandParser.args.map(word => this.spongebobify(word));
    let topText = spongeTexts.slice(0,spongeTexts.length/2).join(' ');
    let bottomText = spongeTexts.slice(spongeTexts.length/2).join(' ');

    const memeImg = 
      `https://api.memegen.link/images/spongebob/${topText}/${bottomText}.png`;


    const memeAttachment = new MessageAttachment(memeImg);
    await message.reply("", memeAttachment);
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