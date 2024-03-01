
import { State, StateCreator, create, devtools } from 'zustand';
import { devtools } from 'zustand/middleware';
import { generateId } from '../helpers';


interface ITask {
    id: string;
    title: string;
    createdAt: number;

}

interface IToDoStore {
    tasks: ITask[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
}

function isToDoStore(object: any): object is IToDoStore {
    return 'tasks' in object
}

const localStorageUpdate = <T extends State>(config: StateCreator<T>): StateCreator<T> => (set, get, api) => config((nextState, ...args) => {
    if (isToDoStore(nextState)) {
        window.localStorage.setItem('tasks', JSON.stringify(
            nextState.tasks
        ))
    }
    set(nextState, ...args)
}, get, api)


const getCurrentState = () => {
    try {
        const currentState = (JSON.parse(window.localStorage.getItem('tasks')) || '[]') as ITask;
        return currentState
    }
    catch(er) {
        window.localStorage.setItem('tasks', [])
    }

    return []
}


export const useToDoStore = create<IToDoStore>(localStorageUpdate((set, get) => ({
    tasks: getCurrentState(),
    createTask: (title) => {
        const { tasks } = get();
        const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now()
        }

        set({
            tasks: [newTask].concat(tasks)
        })
    },
    updateTask: (id, title) => {
        const { tasks } = get()
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title,
            }))
        })
    },
    removeTask: (id) => {
        const { tasks } = get()
        set({
            tasks: tasks.filter((task) => task.id !== id)
        })
        console.log(tasks)
    },
})));