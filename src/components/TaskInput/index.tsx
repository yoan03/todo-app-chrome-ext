import React, { FC, KeyboardEvent, useState } from 'react';
import styles from './index.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

type AppProps = {
    onAddTask: (task: string) => void,
}

const TaskInput: FC<AppProps> = (props) => {
    const [task, setTask] = useState<string>('');

    // Clear the input after task have been sent
    const onSubmitTaskHandler = () => {
        props.onAddTask(task);
        setTask('');
    }

    // Verify if enter key was pressed
    const onKeyEnterDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            onSubmitTaskHandler();
        }
    }

    return (
        <div className={styles.TaskInput}>
            <input 
                type="text" 
                value={task} 
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={onKeyEnterDown} />
            <div className={styles.TaskInput__btn} onClick={onSubmitTaskHandler}>
                <span>Add Task</span>
                <FontAwesomeIcon icon={faPlus} />
            </div>
        </div>
    )
}

export default TaskInput;