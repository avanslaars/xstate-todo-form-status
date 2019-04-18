import { Machine, actions } from 'xstate'
import uuid from 'uuid-v4'
const { assign } = actions

const createTodo = title => {
  return {
    id: uuid(),
    title: title,
    completed: false,
  }
}

export const todosMachine = Machine(
  {
    id: 'todos',
    context: {
      todo: '', // new todo
      todos: [],
    },
    type: 'parallel',
    states: {
      view: {
        initial: 'all',
        states: {
          all: {},
          active: {},
          completed: {},
        },
      },
      status: {
        type: 'parallel',
        states: {
          form: {
            initial: 'init',
            on: {
              'NEWTODO.CHANGE': [
                {
                  target: '.invalid',
                  cond: (ctx, e) => !e.value,
                  actions: 'updateTodo',
                },
                {
                  target: '.valid',
                  cond: (ctx, e) => !!e.value,
                  actions: 'updateTodo',
                },
              ],
            },
            states: {
              init: {
                on: {
                  '': [
                    {
                      target: 'invalid',
                      cond: ctx => !ctx.todo.length,
                    },
                    {
                      target: 'valid',
                      cond: ctx => !!ctx.todo.length,
                    },
                  ],
                },
              },
              valid: {},
              invalid: {},
            },
          },
          interactionStatus: {
            initial: 'init', // set initial clean/dirty state
            states: {
              init: {
                on: {
                  '': [
                    {
                      target: 'clean',
                      cond: ctx => !ctx.todo.length,
                    },
                    {
                      target: 'dirty',
                      cond: ctx => !!ctx.todo.length,
                    },
                  ],
                },
              },
              clean: {
                on: {
                  'NEWTODO.CHANGE': 'dirty', // field has been touched, it's dirty regardless of value
                },
              },
              dirty: {},
            },
          },
        },
      },
    },
    on: {
      'NEWTODO.COMMIT': [
        {
          target: 'status', // with parallel states under children, this resets them all, like magic 🦄
          actions: [
            assign({
              todo: '', // clear todo
              todos: (ctx, e) => ctx.todos.concat(createTodo(e.value.trim())),
            }),
            'persist',
          ],
          cond: (ctx, e) => e.value.trim().length,
        },
      ],
      'TODO.COMMIT': {
        actions: [
          assign({
            todos: (ctx, e) =>
              ctx.todos.map(todo => (todo.id === e.todo.id ? e.todo : todo)),
            todo: '',
          }),
          'persist',
        ],
      },
      'TODO.DELETE': {
        actions: [
          assign({
            todos: (ctx, e) => {
              return ctx.todos.filter(todo => todo.id !== e.id)
            },
          }),
          'persist',
        ],
      },
      'SHOW.all': '.view.all',
      'SHOW.active': '.view.active',
      'SHOW.completed': '.view.completed',
      'MARK.completed': {
        actions: assign({
          todos: ctx => ctx.todos.map(todo => ({ ...todo, completed: true })),
        }),
      },
      'MARK.active': {
        actions: assign({
          todos: ctx => ctx.todos.map(todo => ({ ...todo, completed: false })),
        }),
      },
      CLEAR_COMPLETED: {
        actions: assign({
          todos: ctx => ctx.todos.filter(todo => !todo.completed),
        }),
      },
    },
  },
  {
    actions: {
      updateTodo: assign({
        todo: (ctx, e) => e.value,
      }),
    },
  }
)
