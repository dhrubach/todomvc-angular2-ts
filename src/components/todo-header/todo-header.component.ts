import { Component } from '@angular/core';

import { TodoStoreService } from '../../services/todo-store.service';

@Component({
	selector: 'todo-header',
	template: require('./todo-header.template.html'),
})
export class TodoHeaderComponent {
	public newTodo: string;

	constructor(private todoStore: TodoStoreService) { }

	public addTodo(): void {
		if (this.newTodo.trim().length) {
			this.todoStore.add(this.newTodo);
			this.newTodo = '';
		}
	}
}
