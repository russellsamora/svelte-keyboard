/** @typedef {typeof __propDef.props}  KeyboardProps */
/** @typedef {typeof __propDef.events}  KeyboardEvents */
/** @typedef {typeof __propDef.slots}  KeyboardSlots */
export default class Keyboard extends SvelteComponentTyped<{
    custom: any;
    layout?: string;
    noSwap?: any[];
    keyClass?: {};
}, {
    keydown: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type KeyboardProps = typeof __propDef.props;
export type KeyboardEvents = typeof __propDef.events;
export type KeyboardSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        custom: any;
        layout?: string;
        noSwap?: any[];
        keyClass?: {};
    };
    events: {
        keydown: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
