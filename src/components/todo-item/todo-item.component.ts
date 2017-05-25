import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TodoModel } from '../../models/todo.model';

@Component({
	selector: 'todo-item',
	template: require('./todo-item.template.html'),
})
export class TodoItemComponent {

	@Input() public todo: TodoModel;
	@Output() public itemModified: EventEmitter<any>;
	@Output() public itemRemoved: EventEmitter<any>;
	public editing: boolean;

	constructor() {
		this.itemModified = new EventEmitter();
		this.itemRemoved = new EventEmitter();
		this.editing = false;
	}

	public edit(): void {
		this.editing = true;
	}

	public cancelEditing(): void {
		this.editing = false;
	}

	public stopEditing(editedTitle: HTMLInputElement = new HTMLInputElement()): void {
		this.todo.setTitle(editedTitle.value);
		this.editing = false;

		if (this.todo.title.length === 0) {
			this.remove();
		} else {
			this.update();
		}
	}

	public toggleCompletion(): void {
		this.todo.completed = !this.todo.completed;
		this.update();
	}

	public remove(): void {
		this.itemRemoved.next(this.todo.uuid);
	}

	public update(): void {
		this.itemModified.next();
	}
}
