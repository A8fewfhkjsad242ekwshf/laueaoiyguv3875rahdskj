import { Log, LogLevel, NrPlugin, HookPacket, Packet, PacketType, Client, PluginManager } from './../core';
import { TextPacket } from './../networking/packets/incoming/text-packet';
import { IServer } from './../models/server';
import Discord = require('discord.js');

const PORTAL_REGEX = /^{"key":"server.dungeon_opened_by","tokens":{"dungeon":"(\S.*)", "name":"(\w+)"}}$/;

@NrPlugin({
    name: 'Key Notifier',
    author: 'Lolization',
    enabled: true
})
class KeyNotifier {
    private bot: Discord.Client;
    private ready = false;

    constructor() {
        this.bot = new Discord.Client();
        this.bot.login('NDY2NjU2MzQxMzE5MjIxMjU5.DjPHxQ.dGMGpSZkLOWfY8AW6dOIW4N0U7g');
        this.bot.once('ready', () => this.ready = true);
    }

    @HookPacket(PacketType.TEXT)
    onText(client: Client, textPacket: TextPacket): void {
        const match = PORTAL_REGEX.exec(textPacket.text);

        if (match) {
            // the text contains the JSON payload.
            const portalType = match[1];
            const opener = match[2];
            this.callDungeon(portalType, opener, client.server);
        }
    }

    callDungeon(name: string, opener: string, server: IServer): void {
        if (!this.ready) {
            return;
        }
        (this.bot.channels.get("468808529868750848") as Discord.TextChannel)
            .send(`${name} opened by ${opener} in ${server.name}`);
    }
}