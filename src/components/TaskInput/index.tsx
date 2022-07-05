import React, { FC, useState } from 'react';
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

    return (
        <div className={styles.TaskInput}>
            <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
            <div className={styles.TaskInput__btn} onClick={onSubmitTaskHandler}>
                <span>Add Task</span>
                <FontAwesomeIcon icon={faPlus} />
            </div>
        </div>
    )
}

export default TaskInput;