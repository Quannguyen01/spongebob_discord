import { Message, MessageAttachment } from "discord.js";
import Command from "./commandInterface";
import config from "../config/botConfig";
import { CommandParser } from "../models/commandParser";
import { replaceMentionWithUsers } from "../utils";

export class MemeGenCommand implements Command {
  commandNames = [
    "listmeme",
    "aag",
    "ackbar",
    "afraid",
    "agnes",
    "aint-got-time",
    "ams",
    "ants",
    "apcr",
    "atis",
    "away",
    "awesome",
    "awesome-awkward",
    "awkward",
    "awkward-awesome",
    "bad",
    "badchoice",
    "bd",
    "bender",
    "bihw",
    "biw",
    "blb",
    "boat",
    "both",
    "bs",
    "buzz",
    "captain",
    "captain-america",
    "cb",
    "cbg",
    "center",
    "ch",
    "cheems",
    "chosen",
    "cmm",
    "crazypills",
    "cryingfloor",
    "db",
    "dg",
    "disastergirl",
    "dodgson",
    "doge",
    "drake",
    "ds",
    "dsm",
    "dwight",
    "elf",
    "ermg",
    "fa",
    "facepalm",
    "fbf",
    "feelsgood",
    "fetch",
    "fine",
    "firsttry",
    "fmr",
    "fry",
    "fwp",
    "gandalf",
    "gb",
    "gears",
    "ggg",
    "gru",
    "grumpycat",
    "hagrid",
    "happening",
    "harold",
    "hipster",
    "home",
    "icanhas",
    "imsorry",
    "inigo",
    "interesting",
    "ive",
    "iw",
    "jd",
    "jetpack",
    "joker",
    "jw",
    "keanu",
    "kermit",
    "kk",
    "kombucha",
    "leo",
    "live",
    "ll",
    "lrv",
    "mb",
    "michael-scott",
    "millers",
    "mini-keanu",
    "mmm",
    "money",
    "mordor",
    "morpheus",
    "mw",
    "nice",
    "noidea",
    "ntot",
    "oag",
    "officespace",
    "older",
    "oprah",
    "patrick",
    "persian",
    "philosoraptor",
    "pigeon",
    "ptj",
    "puffin",
    "red",
    "regret",
    "remembers",
    "rollsafe",
    "sad-biden",
    "sad-boehner",
    "sad-bush",
    "sad-clinton",
    "sad-obama",
    "sadfrog",
    "saltbae",
    "sarcasticbear",
    "sb",
    "scc",
    "sf",
    "sk",
    "ski",
    "snek",
    "soa",
    "sohappy",
    "sohot",
    "soup-nazi",
    "sparta",
    "spiderman",
    "ss",
    "stew",
    "stonks",
    "stop-it",
    "success",
    "tenguy",
    "toohigh",
    "tried",
    "trump",
    "ugandanknuck",
    "whatyear",
    "winter",
    "wkh",
    "wonka",
    "worst",
    "xy",
    "yallgot",
    "yodawg",
    "yuno",
    "zero-wing"
  ];

  help(commandPrefix: string) {
    return `Usage: \`?${commandPrefix} Top text | Bottom text\``;
  }

  async run(message: Message): Promise<void> {
    message.content = replaceMentionWithUsers(message);
    const commandParser = new CommandParser(message, config.prefix);

    if (commandParser.parsedCommandName === "listmeme") {
      const memes = this.commandNames
        .filter(command => command !== "listmeme")
        .join(", ");
      const messages = `List of memes:\n > ${memes}`
      await message.reply(messages);
      return;
    }

    const memeTexts = commandParser.args;
    let topText, bottomText: string;
    if (memeTexts.includes("|")) {
      topText = memeTexts.slice(0, memeTexts.indexOf("|")).join(' ');
      bottomText = memeTexts.slice(memeTexts.indexOf("|") + 1).join(' ');
    } else {
      topText = memeTexts.slice(0, memeTexts.length / 2).join(' ');
      bottomText = memeTexts.slice(memeTexts.length / 2).join(' ');
    }

    const memeImg = 
      `https://api.memegen.link/images/${commandParser.parsedCommandName}/${topText}/${bottomText}.png`;

    const memeAttachment = new MessageAttachment(memeImg);
    await message.reply("", memeAttachment);
  }
}