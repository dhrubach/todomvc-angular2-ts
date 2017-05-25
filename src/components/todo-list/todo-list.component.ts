import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoModel } from '../../models/todo.model';
import { TodoStoreService } from '../../services/todo-store.service';

@Component({
	selector: 'todo-list',
	template: require('./todo-list.template.html'),
})
export class TodoListComponent implements OnInit {
	private currentStatus: string;

	constructor(private todoStore: TodoStoreService, private route: ActivatedRoute) {
		this.currentStatus = '';
	}

	public ngOnInit(): void {
		this.route.params
			.map((params) => params.status)
			.subscribe((status) => {
				this.currentStatus = status;
			});
	}

	public remove(uuid: string): void {
		this.todoStore.remove(uuid);
	}

	public update(): void {
		this.todoStore.persist();
	}

	public getTodos(): TodoModel[] {
		if (this.currentStatus === 'completed') {
			return this.todoStore.getCompleted();
		} else if (this.currentStatus === 'active') {
			return this.todoStore.getRemaining();
		} else {
			return this.todoStore.getAllPersisted();
		}
	}

	public allCompleted(): boolean {
		return this.todoStore.hasAllCompleted();
	}

	public setAllTo(toggleAll): void {
		this.todoStore.setAllTo(toggleAll.checked);
	}
}
