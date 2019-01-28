import { Readable, Writable } from "stream";
import {writeFileSync} from 'fs';

it.only('example', () => {
    // const w = new Writable();
    // w.once('data', (x) => {
    //     writeFileSync('xx.txt', String(x));
    // });
    // process.stdout.pipe(w);
    require('./example');
});
