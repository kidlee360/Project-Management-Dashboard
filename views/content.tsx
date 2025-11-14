import Card from '@/views/partials/card';//one way of setting path
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import DisplayCard from '@/views/partials/displayCard';
import styles from '@/views/partials/card.module.css'
import EditCard from './partials/editCard';//another way of setting path
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

export default function Content(props: any) {
    const {
        columnName, 
        tasks, 
        addTask, 
        handleSaveChanges, 
        editingTaskId, 
        setEditingTaskId,
        barClicked, 
        deleteTask } = props;

        // Define a static map to translate priority strings to numbers
        const PRIORITY_ORDER: { [key: string]: number } = {
          'low': 1,
          'medium': 2,
          'high': 3,
        };

        // Filter the global task list to show only tasks belonging to this column
    const columnTasks = tasks.filter(
        (task: any) => task.columnname === columnName
    );

            // Filter based on sideBar button that was clicked
        if (barClicked === "high") {
        // Sort from High (3) down to Low (1)
        columnTasks.sort((a: any, b: any) => {
            const priorityA = PRIORITY_ORDER[a.priority] || 0;
            const priorityB = PRIORITY_ORDER[b.priority] || 0;
            console.log(priorityA, priorityB);
            return priorityA - priorityB; // Descending order (3 then 2 then 1)
        });
    } else if (barClicked === "low") {
        // Sort from Low (1) up to High (3)
        columnTasks.sort((a: any, b: any) => {
            const priorityA = PRIORITY_ORDER[a.priority] || 0;
            const priorityB = PRIORITY_ORDER[b.priority] || 0;
            console.log(priorityA, priorityB);
            return priorityB - priorityA; // Ascending order (1 then 2 then 3)
        });
    } else if (barClicked === "date") {
        // Sorts by date (oldest first) - This logic is fine
        columnTasks.sort((a: any, b: any) =>
            new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
        );
    }

        // --- DND Kit useDroppable hook ---
    const { setNodeRef, isOver } = useDroppable({
        // CRITICAL: The ID DND Kit uses to identify the drop target
        id: columnName, 
        data: {
            type: 'Column',
            name: columnName,
        }
    });

    const handleStartEditing = (taskData: any) => {
        setEditingTaskId(taskData.id);
    };

    const handleStopEditing = () => {
        setEditingTaskId(null);
    };

    const taskIds = React.useMemo(() => columnTasks.map((task: any) => task.id), [columnTasks]);
    
    return (
        <div className={props.className}
            ref={setNodeRef} // DND Kit Ref for the droppable area
        >
            <div className={styles.content}>
                <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                    {columnTasks.map((task: any) => (                    
                        editingTaskId === task.id?
                        <EditCard
                           key={task.id}
                           id={task.id}
                           task={task.task}
                           description={task.description} 
                           due_date={task.due_date} 
                           priority={task.priority} 
                           columnName={task.columnname}
                           onSave={handleSaveChanges}
                           onCancel={handleStopEditing}
                        />
                        :
                        <DisplayCard 
                           key={task.id}
                           id={task.id}
                           task={task.task}
                           description={task.description} 
                           due_date={task.due_date} 
                           priority={task.priority}
                           columnName={task.columnname}
                           onEdit={handleStartEditing}
                           onDelete={deleteTask}
                           
                        />
                         
                       
                    ))}
                </SortableContext>
                <Card 
                  onAdd={addTask}
                  columnName={columnName}
                />
            </div>
        </div>
    );
} 