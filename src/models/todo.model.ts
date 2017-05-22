import { v4 } from 'node-uuid';

export class TodoModel {
    
    public title: string;
    public uuid: string;

    constructor(title: string, public completed: boolean) {
        this.title = title.trim();
        this.uuid = v4();
    }

    setTitle(title: string): void {
        this.title = title;
    }
}
