import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
    public createGUID():string{
        const head = this.getStringBasedFromat(Date.now());
        const random = this.getStringBasedFromat(Math.random());
        const decimalPosition = 2;
        const tail = random.substring(decimalPosition);
        return head +tail;
    }
    private getStringBasedFromat(source:any):string{
        const STRING_BASE=36;
        return source.toString(STRING_BASE);
    }
}
