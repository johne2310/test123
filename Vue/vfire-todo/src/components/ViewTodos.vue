<template>
  <div>
    <header class="page-header"></header>
    <section class="wrapper">
      <form class="new-todo-form">
        <label class="new-todo-label">
          New Todo:
          <input v-model="newTodo" type="text" class="new-todo-input" />
        </label>
        <button type="submit" @click.prevent="addTodo" class="new-todo-button">
          Add
        </button>
      </form>
      <ul class="todo-list">
        <li v-for="todo in todos" :key="todo.id" class="todo-item">
          <label class="todo-item-label">
            <input
              type="checkbox"
              v-model="todo.completed"
              @change="updateTodo(todo)"
              class="todo-item__checkbox"
            />
            {{ todo.text }}
          </label>
          <div v-if="isEditing !== todo.id">
            <button @click="editTodo(todo)" class="todo-button">
              <img src="../assets/pencil.svg" alt="Edit todo" />
            </button>
            <button @click="deleteTodo(todo)" class="todo-button">
              <img src="../assets/trash.svg" alt="Delete todo" />
            </button>
          </div>
          <form v-else class="edit-todo-form">
            <label class="edit-todo-label"
              >Edit:
              <input
                type="text"
                class="edit-todo-input"
                v-model="todoEditText"
              />
            </label>
            <button
              class="edit-todo-button"
              type="submit"
              @click.prevent="updateTodoText()"
            >
              Save
            </button>
          </form>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { todosCollection } from '../firebase';
export default {
  name: 'ViewTodos',
  data() {
    return {
      newTodo: '',
      todos: [],
      isEditing: null,
      todoEditText: '',
    };
  },
  firestore: {
    todos: todosCollection.orderBy('createdAt', 'desc'),
  },
  methods: {
    addTodo() {
      todosCollection
        .add({
          text: this.newTodo,
          completed: false,
          createdAt: new Date(),
          id: this.todos.length,
        })
        .then(docRef => {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch(error => {
          console.error('Error adding document: ', error);
        });
      this.newTodo = '';
    },
    updateTodo(todo) {
      todosCollection
        .doc(todo.id)
        .update({ ...todo })
        .then(() => {
          console.log('Document updated');
        })
        .catch(error => {
          console.error('Error updating document: ', error);
        });
    },
    //delete
    deleteTodo(todo) {
      console.log('Deleting todo.id: ', todo.id);
      todosCollection.doc(todo.id).delete();
    },
    editTodo(todo) {
      this.isEditing = todo.id;
      this.todoEditText = todo.text;
    },
    updateTodoText() {
      todosCollection
        .doc(this.isEditing)
        .update({ text: this.todoEditText })
        .then(() => {
          console.log('Todo text has been updated');
        })
        .catch(error => {
          console.log('Error updating text in document: ', error);
        });
      this.isEditing = null;
    },
  },
};
</script>

<style scoped></style>
