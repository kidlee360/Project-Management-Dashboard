import styles from '@/views/HomeComponent.module.css';
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, KeyboardSensor, useSensor, useSensors, closestCorners, DragOverlay } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import SideBar from '@/views/partials/sideBar';
import Content from '@/views/content';
import DisplayCard from './partials/displayCard';
import Header from './partials/header';
import Component from './authentication';

export default function App() {
interface Task {
        id: number;
        task: string;
        description: string;
        due_date: Date;
        columnname: string;
        priority: string;
    }
    const [tasks, setTasks] = useState<Task[]>([]);
    const [refetchToggle, setRefetchToggle] = useState(false);
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [barClicked, setBarClicked] = useState("");
    const [userAuthenticated, setUserAuthenticated] = useState(false);

    useEffect(() => {
        const storedAuthStatus = sessionStorage.getItem('isAuthenticated');
        if (storedAuthStatus === 'true') {
            setUserAuthenticated(true);
        }
    }, []);



//--GET ROUTE--//
    const fetchTasks = async() => {      
        try {
            const response = await axios.get('/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => { // THIS IS VERY CRUCIAL O. WITHOUT IT YOU WOULDNT SEE ANY DATA IN THE CONTENT1 ARRAY
       fetchTasks();
    }, [refetchToggle]); // 💡 Now it runs on initial load AND when refetchToggle changes

//--POST ROUTE--//
    //the task with the type: "any" is coming from the Card component when the form is submitted where it was changed from props.onAdd(card);
    const addTask = async (task: any) => {
        const columnname = task.columnName || 'To Do'; // Default column for new tasks
        const addTaskData = [ task.task, task.description, task.due_date, columnname, task.priority ];
        try {
            const response = await axios.post('/api/tasks', addTaskData);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const [editingTaskId, setEditingTaskId] = useState(null);
    // This function will be called when the user clicks the "Edit" button
    const handleStartEditing = (dCard: any) => { //the dCard is sent over from the displayCard. it can be named anyhting eg task. Just decided to name it dCard for easier understanding
      setEditingTaskId(dCard.id); //whatever you name it above influences it eg task above would be = task.id
    };
    
    // This function will be called to exit edit mode (e.g., on cancel or save)
    const handleStopEditing = () => {
      setEditingTaskId(null);
    };

//--EDIT ROUTE--// 
    // You'll also need a function to handle the actual save logic
    const handleSaveChanges = async (eCard: any) => { // you can name it anything like props, hello etc. Just decided to leave it as eCard for easier understanding
        // ... logic to update the task in your main 'tasks' array
        const updateTaskData = { //   MAKE SURE THE FUNCTION USES {} AND NOT [] IF NOT IT WOULDNT WORK AND YOU WOULDNT EVEN KNOW WHY
            task: eCard.task, 
            description: eCard.description, 
            due_date: eCard.due_date, 
            columnname: eCard.columnName || 'To Do', // The columnname you are using in the query
            priority: eCard.priority, 
            id: eCard.id // CRUCIAL for the WHERE clause
        };
        try{
            console.log(updateTaskData);
            await axios.put('/api/tasks', updateTaskData);
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
          
        handleStopEditing(); // Exit edit mode after saving
    };

//--DELETE ROUTE--//
    const deleteTask = async (taskId: number) => {
        try {
            // 1. Send the DELETE request
            // Axios sends the object { id: taskId } in the request body
            await axios.delete('/api/tasks', { data: { id: taskId } }); 
            
            // Note on Axios: For DELETE requests, the body must be passed via the 'data' property
            
            // 2. Update the state by removing the task (optimistic update)
            // Alternatively, you could call await fetchTasks(); again (safe, but slower)
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    
        } catch (error) {
            console.error('Error deleting task:', error);
            // Add logic here to re-fetch if the delete failed, or show an error message
        } 
    };

//--LOGIC FOR MOVING TASKS--//
    const moveTask = async (taskId: number, newColumn: 'To Do' | 'In Progress' | 'Done') => {
        const taskToMove = tasks.find(t => t.id === taskId);
        if (!taskToMove || taskToMove.columnname === newColumn) return; 
        // 1. Optimistic UI Update: Change columnname in local state immediately
        const updatedTask = { ...taskToMove, columnname: newColumn };
        
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? updatedTask : task
            )
        ); 
        // 2. API Call to update the database
        try {
            const payload = { id: taskId, columnname: newColumn };
            console.log('Attempting to move task with payload:', payload);

            await axios.patch('/api/tasks', payload);

            console.log('Task move successful for task ID:', taskId);
        } catch (error: any) {
            console.error(`Error moving task ${taskId} to ${newColumn}:`, error);
            // 3. Revert: If the API call fails, revert the UI state by fetching the correct data
            alert(`Failed to save card position. The card will be moved back.\n\nError: ${error.message}\n\nCheck the browser's developer console (F12) for more details.`);
            fetchTasks();
        }
    };    
    
    const columnProps = {
      tasks,
      addTask,
      handleSaveChanges,
      editingTaskId,
      setEditingTaskId,
      deleteTask
    }

    const findContainer = (id: string | number) => {
        if (['To Do', 'In Progress', 'Done'].includes(id.toString())) {
            return id.toString();
        }
        const task = tasks.find(t => t.id === id);
        return task?.columnname;
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            // Require the pointer to move by 10 pixels before activating
            // For mobile, this avoids conflicts with scrolling
            activationConstraint: {
              distance: 10,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const task = tasks.find(t => t.id === active.id);
        if (task) {
            setActiveTask(task);
        }
    };

    // In homeComponent.jsx
const handleDragOver = (event: DragOverEvent) => {
    // Only handling visual reordering if needed. 
    // Since you only care about column persistence, we can leave this simple.
    // DND Kit handles the visual effects automatically when using SortableContext/useSortable.
    // For pure column moves, we can often leave this empty or remove it.
    
    // For now, let's keep it minimal and let handleDragEnd handle the state/db update.
    const { active, over } = event;
    if (!over) return;

    const isOverAColumn = ['To Do', 'In Progress', 'Done'].includes(over.id.toString());
    const isOverATask = tasks.some(t => t.id === over.id);

    // If the active item is a task and the over item is not a task, 
    // or if the active item is a task and the over item is a task in another column, 
    // DND-Kit will handle the visual transition into the new container. 
};

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveTask(null);
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId !== overId) {
            const activeContainer = activeTask?.columnname;
            const overContainer = findContainer(overId);

            if (!activeContainer || !overContainer) return;

            const activeIndex = tasks.findIndex(t => t.id === activeId);
            const overIndex = tasks.findIndex(t => t.id === overId);

            if (activeContainer === overContainer) {
                // Reordering within the same column
                if (activeIndex !== overIndex) {
                    setTasks(items => arrayMove(items, activeIndex, overIndex > -1 ? overIndex : items.length -1));
                }
            } else {
                // Moving to a different column
                moveTask(active.id as number, overContainer as 'To Do' | 'In Progress' | 'Done');
            }
        }
    };
    
    function barClick(active: string){
        setBarClicked(active);
        console.log(active);
    }


////======= SEND THE FORM TO THE REGISTER OR LOGIN FOR AUTHENTICATION AND VERIFICATION ======////

     const sendForm = async (form: any, account: boolean) => {
    const url = '/api/users';
    try {
        const body = {
            username: form.userName,
            email: form.email,
            password: form.password,
            account: account
        }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        sessionStorage.setItem('isAuthenticated', 'true')
        setUserAuthenticated(true);
        sessionStorage.setItem('id', data)
        // Handle successful login or registration, e.g., redirect or update UI
      } else {
        console.error(data.message);
        // Handle error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const logOut = () => {
    sessionStorage.setItem('isAuthenticated', 'false');
    setUserAuthenticated(false);
  }





////////============RETURN DIFFERENT PAGES BASED ON IF USER IS AUTHENTICATED ===============////////////


  return (
    userAuthenticated?
    <DndContext 
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd} 
        collisionDetection={closestCorners}
    >
        <div className={styles.app}>
        <div className={styles.check}>
            <div className={styles.logo} onClick={logOut}><span>Log Out</span> </div>
            <Header className={styles.header} />
            <SideBar className={styles.sidebar} sideBarClick={barClick}/>
            <Content
            {...columnProps}
            className={styles.content1}
            columnName = "To Do"
            onMoveTask={moveTask}
            barClicked={barClicked}
            />
            <Content
            {...columnProps}
            className={styles.content2} 
            columnName = "In Progress"
            onMoveTask={moveTask}
            barClicked={barClicked}
            />
            <Content
            {...columnProps}
            className={styles.content3}
            columnName = "Done"
            onMoveTask={moveTask}
            barClicked={barClicked}
            />

        </div>

        </div>
        <DragOverlay>
            {activeTask ? <DisplayCard id={activeTask.id} task={activeTask.task} description={activeTask.description} due_date={activeTask.due_date} priority={activeTask.priority} onEdit={() => {}} onDelete={() => {}} /> : null}
        </DragOverlay>
    </DndContext>
    :
    <Component userForm={sendForm}/>
  );

}
