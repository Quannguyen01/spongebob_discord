import { Collection, Message } from "discord.js";

export function getUsersFromMessages(message: Message): Collection<string, string> {
  let mentionedUsers = new Collection<string, string>();

  for (let [key, user] of message.mentions.users) {
    mentionedUsers.set(key, user.username);
  }

  return mentionedUsers;
}

export function replaceMentionWithUsers(message: Message): string {
  let content = message.content;
  const mentionedUsers = getUsersFromMessages(message);
  const matches = message.content.matchAll(/<@!?(\d+)>/g) || [];

  for (const match of matches) {
    const user = mentionedUsers.get(match[1]);
    console.log(user);
    if (user !== undefined) {
      content = content.replace(match[0], user);
    }
  }

  return content;
}