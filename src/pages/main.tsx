import { FC, useState, useEffect } from 'react';
import styles from './styles/main.module.css';
import { Task as TaskInterface } from '../ts/interfaces/app.interface';
import { app, db } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, onSnapshot, query, where, orderBy, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';

// Components
import TaskInput from '../components/TaskInput';
import Task from '../components/Task';


type MainProps = {
    onLogoutClicked: () => void
};

const Main: FC<MainProps> = (props) => {
    const [tasks, setTasks] = useState<Array<TaskInterface>>([]);

    // Read Task
    useEffect(() => {
        const auth = getAuth(app);
        const q = query(collection(db, "todos"), where("uid", "==", auth.currentUser?.uid), orderBy("timestamp"));
        onSnapshot(q, querySnapshot => {
            const tasks: any = [];
            querySnapshot.forEach(doc => {
                tasks.push({
                    id: doc.id,
                    task: doc.data().task,
                    done: doc.data().done,
                    timestamp: doc.data().timestamp
                });
            });

            setTasks(tasks)
            console.log("Tasks found with user: ", JSON.stringify(tasks));
        });
    }, []);


    // Task Handler - to toggle task if clicked
    const onTaskToggle = async (id: string) => {
        const docRef = doc(db, 'todos', id);

        const docSnap = await getDoc(docRef);

        if (docRef) {
            updateDoc(docRef, {
                done: !docSnap.data()?.done
            });
        }
    }

    // Task Handler - to delete task if delete btn is clicked
    const onTaskDelete = (id: string) => {
        const docRef = doc(db, 'todos',  id);

        if (docRef)
            deleteDoc(docRef);
    }

    const onTaskInputAddTask = async (task: string) => {
        try {
            const auth = getAuth(app);
            const uid = auth.currentUser?.uid;

            const docRef = await addDoc(collection(db, 'todos'), {
                uid: uid,
                task: task,
                done: false,
                timestamp: new Date()
            });

            console.log("Document written with ID: ", docRef.id);
        } catch (err) {
            console.error("Error creating new task: ", err);
        }
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
            <div className={styles.Logout} onClick={props.onLogoutClicked}>Log Out</div>
        </div>
    )
};

export default Main;