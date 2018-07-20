"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// These 5 imports are essential for any plugin.
const core_1 = require("./../core");
const outgoing_1 = require("./../networking/packets/outgoing");
// The NrPlugin decorator gives nrelay some information about
// your plugin. If it is not present, nrelay won't load the plugin.
let HelloPlugin = class HelloPlugin {
    // The HookPacket decorator will cause the method to be called
    // whenever a packet with the specified packet type is recieved.
    // Any method with a HookPacket decorator should always have
    // the method signature (client: Client, packet: Packet).
    onText(client, textPacket) {
        // Check that the text packet was for the client.
        if (textPacket.recipient === client.playerData.name) {
            // Check that the message was 'hello'
            if (textPacket.text === 'hello') {
                // Make a new player text packet in order to reply.
                const reply = new outgoing_1.PlayerTextPacket();
                reply.text = '/tell ' + textPacket.name + ' Hello!';
                // Send the reply.
                client.packetio.sendPacket(reply);
            }
        }
    }
};
__decorate([
    core_1.HookPacket(core_1.PacketType.TEXT)
    // Any method with a HookPacket decorator should always have
    // the method signature (client: Client, packet: Packet).
], HelloPlugin.prototype, "onText", null);
HelloPlugin = __decorate([
    core_1.NrPlugin({
        name: 'Hello Plugin',
        author: 'tcrane'
    })
], HelloPlugin);
