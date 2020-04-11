import { Server } from 'hapi__hapi';
import laabr from "laabr";

const server = new Server();

const laabrOptions: laabr.RegisterOptions = {
    tokens: {
        hello: () => 'hello!'
    },
    presets: {
        serverenv: ':time :environment :host :host[port]'
    },
    formats: {
        log: "log.tiny"
    },
    colored: true,
    indent: "4",
    override: false,
    preformatter: (data) => data,
    postformatter: (data) => data,
    handleUncaught: false,
    stream: process.stdout,
    pino: {},
    hapiPino: {}
}

laabr.format('log', 'log.tiny');
laabr.token('hello', () => 'hello!');
laabr.preset('server.env', ':time :environment :host :host[port]');

server.register(laabr, laabrOptions);

