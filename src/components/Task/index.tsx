import { FC, useEffect, useRef } from 'react';
import { Task as TaskType } from '../../ts/interfaces/app.interface';
import styles from './index.module.css';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

type AppProps = TaskType & {
    onClick: (id: string) => void,
    onDelete: (id: string) => void
}

const Task: FC<AppProps> = (props) => {
    const taskRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const taskTextElement: HTMLDivElement | null = taskRef.current?.querySelector('[data-type="task-text"]') || null;

        if(props.done)
            taskTextElement?.classList.add('done');
        else
            taskTextElement?.classList.remove('done');
    }, [props.done]);

    return (
        <div className={styles.Task} ref={taskRef}>
            <div data-type="task-text" className={styles.Task__text} onClick={() => props.onClick(props.id!)}>{props.task}</div>
            <div data-type="delete-btn" className={styles.Task__btn} onClick={() => props.onDelete(props.id!)}>
                <FontAwesomeIcon icon={faTrash} />
            </div>
        </div>
    );
};

export default Task;