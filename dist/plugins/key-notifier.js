"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./../core");
const Discord = require("discord.js");
const PORTAL_REGEX = /^{"key":"server.dungeon_opened_by","tokens":{"dungeon":"(\S.*)", "name":"(\w+)"}}$/;
let KeyNotifier = class KeyNotifier {
    constructor() {
        this.ready = false;
        this.bot = new Discord.Client();
        this.bot.login('no u');
        this.bot.once('ready', () => this.ready = true);
    }
    onText(client, textPacket) {
        const match = PORTAL_REGEX.exec(textPacket.text);
        if (match) {
            // the text contains the JSON payload.
            const portalType = match[1];
            const opener = match[2];
            this.callDungeon(portalType, opener, client.server);
        }
    }
    callDungeon(name, opener, server) {
        if (!this.ready) {
            return;
        }
        this.bot.channels.get("468808529868750848")
            .send(`${name} opened by ${opener} in ${server.name}`);
    }
};
__decorate([
    core_1.HookPacket(core_1.PacketType.TEXT)
], KeyNotifier.prototype, "onText", null);
KeyNotifier = __decorate([
    core_1.NrPlugin({
        name: 'Key Notifier',
        author: 'Lolization',
        enabled: true
    })
], KeyNotifier);
