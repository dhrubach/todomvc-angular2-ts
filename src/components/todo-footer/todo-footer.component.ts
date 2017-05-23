import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';

import { TodoStoreService } from '../../services/todo-store.service';

@Component({
	selector: 'todo-footer',
	template: require('./todo-footer.template.html')
})
export class TodoFooterComponent implements OnInit {
	private currentStatus: string;

	constructor(private todoStore: TodoStoreService, private route: ActivatedRoute) {
		this.currentStatus = '';
	}

	public ngOnInit(): void {
		this.route.params
			.map((params) => params.status)
			.subscribe((status) => {
				this.currentStatus = status || '';
			});
	}

	public removeCompleted(): void {
		this.todoStore.removeCompleted();
	}

	public getCount() {
		return this.todoStore.getRemaining().length
			+ this.todoStore.getCompleted().length;
	}

	public getRemainingCount(): number {
		return this.todoStore.getRemaining().length;
	}

	public hasCompleted(): boolean {
		return this.todoStore.getCompleted().length > 0;
	}
}
