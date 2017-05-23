import { Injectable } from '@angular/core';

import { TodoModel } from '../models/todo.model';

export class TodoStoreService {
	private todos: TodoModel[];
	private completedTodos: TodoModel[];
	private remainingTodos: TodoModel[];

	constructor() {
		const persistedTodos: TodoModel[] =
			(JSON.parse(localStorage.getItem('angular2-todos')) || []) as TodoModel[];

		this.todos = persistedTodos.map((todo) => {
			const ret = new TodoModel(todo.title, todo.completed);
			ret.uuid = todo.uuid;
			return ret;
		});

		this.completedTodos = [];
		this.remainingTodos = [];
	}

	public get(state): TodoModel[] {
		return this.todos.filter((todo) => todo.completed === state.completed);
	}

	public allCompleted(): boolean {
		return this.todos.length === this.getCompleted().length;
	}

	public setAllTo(completed: boolean): void {
		this.todos.forEach((todo) => todo.completed = completed);
		this.persist();
	}

	public removeCompleted(): void {
		this.todos = this.get({ completed: false });
		this.persist();
	}

	public getRemaining(): TodoModel[] {
		if (!(this.remainingTodos && this.remainingTodos.length)) {
			this.remainingTodos = this.get({ completed: false });
		}

		return this.remainingTodos;
	}

	public getCompleted(): TodoModel[] {
		if (!(this.completedTodos && this.completedTodos.length)) {
			this.completedTodos = this.get({ completed: true });
		}

		return this.completedTodos;
	}

	public toggleCompletion(uid: string): void {
		const todo: TodoModel = this.findByUid(uid);

		if (todo) {
			todo.completed = !todo.completed;
			this.persist();
		}
	}

	public remove(uid: string): void {
		const todo: TodoModel = this.findByUid(uid);

		if (todo) {
			this.todos.splice(this.todos.indexOf(todo), 1);
			this.persist();
		}
	}

	public add(title: string = ''): void {
		this.todos.push(new TodoModel(title, false));
		this.persist();
	}

	public persist(): void {
		this.clearCache();
		localStorage.setItem('angular2-todos', JSON.stringify(this.todos));
	}

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
