import { Inversion } from './inversion';
import { Image } from './image';

export interface Application {
    inversion: Inversion;
    images: Image[];
    currency: string;
    cashflowData: (string | number)[][]
}
