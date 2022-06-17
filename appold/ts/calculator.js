"use strict";
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
require("events");
require("process");
require("typescript");
;
let myMsg = { channel: 'mymessage', a: 1 };
console.log(myMsg);
var nodejs;
(function (nodejs) {
    nodejs.testfn = () => { return ''; };
    nodejs.handlers = { 'testfn': nodejs.testfn };
})(nodejs || (nodejs = {}));
console.dir(nodejs.handlers['testfn']);
const add = (e, msg) => __awaiter(void 0, void 0, void 0, function* () {
    return msg.x + msg.y;
});
let services = {
    'add': add
};
exports.services = services;
//# sourceMappingURL=calculator.js.map