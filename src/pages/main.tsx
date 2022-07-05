import { FC, useState } from 'react';
import styles from './styles/main.module.css';
import { Task as TaskInterface } from '../ts/interfaces/app.interface';

// Components
import TaskInput from '../components/TaskInput';
import Task from '../components/Task';

const Main: FC = (props) => {
    const [counter, setCounter] = useState(0);
    const [tasks, setTasks] = useState<Array<TaskInterface>>([]);

    // Task Handler - to toggle task if clicked
    const onTaskToggle = (id: string) => {
        const updatedTask = tasks.map(task => {
            if (task.id === id) {
                task.done = !task.done;
            }

            return task;
        })

        setTasks(updatedTask);
    }

    // Task Handler - to delete task if delete btn is clicked
    const onTaskDelete = (id: string) => {
        const deletedTask = tasks.filter(task => task.id !== id);

        setTasks(deletedTask);
    }

    // Task Input Handler - Add task when add btn is click or enter is pressed
    const onTaskInputAddTask = (task: string) => {
        const updatedTasks = [...tasks];
        
        const newTask: TaskInterface = {
            id: `task-${counter}`,
            task,
            done: false
        };

        updatedTasks.push(newTask);
        setTasks(updatedTasks);

        // Increment counter
        setCounter(count => count + 1);
    }

    return (
        <div className={styles.MainPage}>
            <h3>ToDo Chrome Extension</h3>
            <hr />
            {tasks.length > 0 ? 
            <div>
                {tasks.map(task => <Task key={task.id} {...task} onClick={onTaskToggle} onDelete={onTaskDelete} />)}
                <hr />
            </div> 
            : 
            <div className={styles.NoTaskMessage}>
                There is no Task. <br/> Add a task to complete.
            </div>}
            <TaskInput onAddTask={onTaskInputAddTask}  />
        </div>
    )
};

export default Main;