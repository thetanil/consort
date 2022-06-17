"use strict";
// export default class Calculator {
//     services: { add: (ev: Event, msg: any) => Promise<any>; }[] = []
//     constructor() {
//         this.services = [
//             { 'add': async (ev: Event, msg: any) => { return msg.x + msg.y } }
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.services = void 0;
;
let myMsg = { channel: 'mymessage', a: 1 };
console.log(myMsg);
var nodejs;
(function (nodejs) {
    nodejs.testfn = () => { return ''; };
    nodejs.handlers = { 'testfn': nodejs.testfn };
})(nodejs || (nodejs = {}));
console.dir(nodejs.handlers['testfn']);
// Object.keys(nodejs.handlers).forEach(h => {
//     console.dir(nodejs.handlers[h])
// });
// class SSMessage implements SSMessageObject {
//     // public static generateMessageId(length = 16): SSMessageId {
//     //     return Math.random().toString(16).substr(2, length);
//     // }
//     // constructor() {
//     //     this.ss_message_id = SSMessage.generateMessageId()
//     // }
//     [key: string]: JSONValue;
// }
// type SSMessage = JSONObject;
// const msg1: SSMessage = { ss_message_id: 'asd', a: 1 }
// msg1.b = 5
// console.log(JSON.stringify(msg1))
// const msg2: SSMessage = {
//     a: 1,
//     ss_message_id: 'first_message'
// }
// console.log(JSON.stringify(msg2))
// interface FirstMessage extends SSMessage { ss_message_id: "first-message" }
// interface SecondMessage extends SSMessage { ss_message_id: "second-message", a: 0 }
// const first: FirstMessage = {
//     ss_message_id: 'first-message'
// };
// console.log(`first: ${JSON.stringify(first)}`)
// class NumberPairMessage extends SSMessage {
//     readonly id!: string;
//     readonly x!: number;
//     readonly y!: number;
//     constructor(x: number, y: number) { super() }
// }
// class SSObject extends EventEmitter {
//     public message<T>(arg: T): T {
//         return arg
//     }
//     public send: SendFn<SSMessage> = (msg: SSMessage): Promise<SSMessage> => {
//         return new Promise<SSMessage>((resolve, reject) => {
//             resolve(msg)
//         })
//     }
// }
// interface IMessageSender<T> {
//     send(msg: T): Promise<SSMessage>
// }
// class STObject implements SendFn<FirstMessage> {
//     public send: SendFn<FirstMessage> = (msg: FirstMessage): Promise<SSMessage> => {
//         return new Promise<SSMessage>((resolve, reject) => {
//             resolve(msg)
//         })
//     }
//     // send_first<FirstMessage>(msg): Promise<SSMessage> { }
//     // send_first(msg: FirstMessage): Promise<SSMessage> {
//     //     console.dir(msg)
//     //     return new Promise((resolve) => { resolve(msg) })
//     // }
//     send_second(msg: SecondMessage): Promise<SSMessage> {
//         console.dir(msg)
//         return new Promise((resolve) => { resolve(msg) })
//     }
// }
// let sto = new STObject()
// sto.send({ ss_message_id: 'first-message', a: 1, b: 2 })
// let o = new SSObject().message(first)
// console.log(`o json: ${JSON.stringify(o)}`)
// console.dir(o)
// let p = new SSObject()
// let q = p.send(first)
// console.dir(q)
// let x = p.send({
//     a: 1,
//     ss_message_id: 'second'
// })
// class Calculator extends SSObject {
//     constructor() {
//         super();
//         this.emit('ready');
//         this.on('add', async () => { })
//     }
//     public Add(a: number, b: number): number {
//         return a + b;
//         let o = new SSObject()
//         // o.send(new NumberPairMessage(1, 2))
//     }
// }
const add = (e, msg) => __awaiter(void 0, void 0, void 0, function* () {
    return msg.x + msg.y;
});
let services = {
    'add': add
};
exports.services = services;
// export default new Calculator();
//# sourceMappingURL=calculator.js.map