import { EventEmitter } from '@angular/core';

export interface ChangeNotifier {
    changeEmitter: EventEmitter<any>;
    emit(): void;
}
