import { Injectable } from '@angular/core';

import { TodoModel } from '../models/todo.model';

@Injectable()
export class TodoStoreService {
	private todos: TodoModel[];
	private completedTodos: TodoModel[];
	private remainingTodos: TodoModel[];

	constructor() {
		const persistedTodos =
			(JSON.parse(localStorage.getItem('angular2-todos')) || []);

		this.todos = persistedTodos.map((todo: TodoModel) => {
			const tempTodo = new TodoModel(todo.title, false);
			tempTodo.uuid = todo.uuid;
			return tempTodo;
		});

		this.completedTodos = [];
		this.remainingTodos = [];
	}

	// get

	public getByState(state): TodoModel[] {
		return this.todos.filter((todo) => todo.completed === state.completed);
	}

	public getRemaining(): TodoModel[] {
		if (!(this.remainingTodos && this.remainingTodos.length)) {
			this.remainingTodos = this.getByState({ completed: false });
		}

		return this.remainingTodos;
	}

	public getCompleted(): TodoModel[] {
		if (!(this.completedTodos && this.completedTodos.length)) {
			this.completedTodos = this.getByState({ completed: true });
		}

		return this.completedTodos;
	}

	public getAllPersisted(): TodoModel[] {
		return this.todos;
	}

	// add / remove

	public add(title: string = ''): void {
		this.todos.push(new TodoModel(title, false));
		this.persist();
	}

	public remove(uid: string): void {
		const todo: TodoModel = this.findByUid(uid);

		if (todo) {
			this.todos.splice(this.todos.indexOf(todo), 1);
			this.persist();
		}
	}

	public removeCompleted(): void {
		this.todos = this.getByState({ completed: false });
		this.persist();
	}

	// state change

	public setAllTo(completed: boolean): void {
		this.todos.forEach((todo) => todo.completed = completed);
		this.persist();
	}

	public toggleCompletion(uid: string): void {
		const todo: TodoModel = this.findByUid(uid);

		if (todo) {
			todo.completed = !todo.completed;
			this.persist();
		}
	}

	// helpers

	public hasAllCompleted(): boolean {
		return this.todos.length === this.getCompleted().length;
	}

	public persist(): void {
		this.clearCache();
		localStorage.setItem('angular2-todos', JSON.stringify(this.todos));
	}

	// private functions

	private findByUid(uid: string): TodoModel {
		const matchedTodo: TodoModel[] =
			this.todos.filter((todo) => todo.uuid === uid);

		return matchedTodo && matchedTodo.length && matchedTodo[0];
	}

	private clearCache(): void {
		this.completedTodos = [];
		this.remainingTodos = [];
	}
}
