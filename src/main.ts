import 'core-js/client/shim';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'node-uuid';
import 'localStorage';
import 'rxjs';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import 'todomvc-app-css/index.css';
import 'todomvc-common/base.css';

import { MainModule } from './main.module';

platformBrowserDynamic().bootstrapModule(MainModule);
