// Type definitions for laabr 6.0
// Project: https://github.com/felixheck/laabr#readme
// Definitions by: Felix Maury <https://github.com/femaury>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node"/>

import {
    Server,
    ServerRegisterOptions,
    PluginPackage,
    // Plugin
} from "hapi__hapi";

declare namespace Laabr {

    type RegisterFunction = (
        server: Server,
        options: ServerRegisterOptions
    ) => void;

    type FormatLabel =
        'log' |
        'request' |
        'response' |
        'request-error' |
        'onPostStart' |
        'onPostStop' |
        'uncaught';

    // type ReservedPresetLabel = 
    //     "log.tiny" |
    //     "log.tinyjson" |
    //     "error.tiny" |
    //     "error.tinyjson" |
    //     "error.stackjson" |
    //     "error.json" |
    //     "response.tiny" |
    //     "server.info";

    type FormatAssign = (
        event: FormatLabel,
        format: string | false
    ) => void;

    type FormatPreset = (
        key: string,
        preset: string | false
    ) => void;

    type ChalkObject = {
        level: any,
        status: any,
        dim: any
    };

    // TODO: Proper type definitions for callback arguments from @types/chalk
    type TokenCallback = (
        data: any,
        colors: ChalkObject,
        field?: string
    ) => string;

    type TokenAssign = (
        name: string,
        callback: TokenCallback 
    ) => void;

    /**
     * laabr's Hapi.js plugin object
     */
    const plugin: {
        register: RegisterFunction,
        pkg: PluginPackage
    };

    /**
    * Reassign or disable specific format.
    *
    * @param key The name of the format
    * @param format The format string or preset key
    * 
    * @example
    * laabr.format('log', 'log.tiny'); // preset key
    * laabr.format('response', ':time :method :remoteAddress :url :status :payload (:responseTime ms)'); // format string
    */
    const format: FormatAssign;

    /**
    * Add a format preset to the collection.
    *
    * @param key The name of the preset
    * @param format The format string to be preset
    *
    * @throws Key cannot be already existing preset:
    * ```
    * 'log.tiny', 'log.tinyjson', 'error.tiny', 'error.tinyjson', 'error.stackjson', 'error.json', 'response.tiny', 'server.info'
    * ```
    * @example
    * laabr.preset('server.env', ':time :environment :host :host[port]');
    */
    const preset: FormatPreset;
    
    /**
    * Assign new token to the collection.
    *
    * @param key The name of the token
    * @param token The token callback
    * 
    * @example 
    * // Assigns the string 'hello!' to token `:hello`
    * laabr.token('hello', () => 'hello!');
    */
    const token: TokenAssign;
    
    /**
     * laabr's Hapi.js plugin register method
     */
    const register: RegisterFunction;
    
    /**
     * laabr's Hapi.js plugin package property
     */
    const pkg: PluginPackage;

    /**
     * laabr's Hapi.js plugin options
     * 
     * [See docs](https://github.com/felixheck/laabr/blob/master/docs/api.md#options)
     */
    interface RegisterOptions extends ServerRegisterOptions {
        /**
         * Can be used instead of
         * laabr.token(<string> name, <Function> callback).
         * Use `name`/`callback` as key-value pairs.
         * 
         * @default {}
         */
        tokens?: object
        
        /**
         * Can be use instead of 
         * laabr.preset(<string> key, <string|false> preset).
         * Use `key`/`preset` as key-value pairs.
         * 
         * @default {}
         */
        presets?: object
        
        /**
         * Can be used instead of
         * laabr.format(<string> event, <string|false> format).
         * Use `event`/`format` as key-value pairs.
         * 
         * @default {}
         */
        formats?: object
        
        /**
         * Partially colorizes token outputs with ANSI powered by `Chalk`.
         * 
         * @default false
         */
        colored?: boolean
        
        /**
         * Take a look at the space argument of JSON.stringify.
         * This setting is just relevant for format strings marked as JSON.
         * 
         * @default 2
         */
        indent?: string | number

        /**
         * Override several console logging methods with corresponding bound
         * server.log functions to enable logging everywhere.
         * Keep the options.pino.level in mind which is set to info by default.
         * 
         * @default false
         */        
        override?: boolean
        
        /**
         * Preformat the originally logged message before getting processed by laabr.
         * The function is passed the JSON object and the options as arguments
         * and have to return an object as well. The plugin evaluates the type of
         * the logged message just before – so it is not possible to fake an event.
         * But have in mind that the token's return value could be affected.
         * 
         * @default (data) => data
         */
        preformatter?: (data: object, options?: object) => object
        
        /**
         * Preformat the logged message after getting processed by laabr.
         * The function is passed the processed string and the options as arguments
         * and have to return a string as well.
         * 
         * @default (data) => data
         */
        postformatter?: (data: string, options?: object) => string
        
        /**
         * If uncaught exception should be logged. Overrides the default behavior of
         * Event: 'uncaughtException' but exits the process.
         * 
         * @default false
         */
        handleUncaught?: boolean

        /**
         * Take a look at the stream argument of pino.
         * 
         * @default process.stdout
         */
        stream?: NodeJS.WriteStream

        /**
         * pino related options.
         * `prettyPrint`, `timestamp` and `browser` are effectless.
         * The created instance is passed to hapi-pino.
         * 
         * @default {}
         */
        pino?: object

        /**
         * hapi-pino related options. 
         * `prettyPrint` and `instance` are effectless.
         * Use `options.pino` to configre the passed instance.
         * 
         * @default {}
         */
        hapiPino?: object
    }
}

export const plugin: {
    register: Laabr.RegisterFunction,
    pkg: PluginPackage
};
export const format: Laabr.FormatAssign;
export const preset: Laabr.FormatPreset;
export const token: Laabr.TokenAssign;
export const register: Laabr.RegisterFunction;
export const pkg: PluginPackage;
export type RegisterOptions = Laabr.RegisterOptions;

// declare var Laabr: Plugin<Laabr.RegisterOptions>;

export default Laabr;