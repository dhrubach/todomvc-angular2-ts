import { v4 } from 'node-uuid';

export class TodoModel {

	public uuid: string;

	constructor(public title: string, public completed: boolean) {
		this.uuid = v4();
	}

	public setTitle(title: string): void {
		this.title = title;
	}
}
