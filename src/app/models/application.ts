import { Inversion } from './inversion';
import { AppImage } from './app-image';

export interface Application {
    inversion: Inversion;
    images: AppImage[];
    currency: string;
    cashflowData: (string | number)[][]
}
