import React, { useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
 import EditIcon from '@mui/icons-material/Edit';
 import DeleteIcon from '@mui/icons-material/Delete';
 import styles from '@/views/partials/card.module.css';
 import clsx from 'clsx';


function DisplayCard(props: any) {
    const { id, task, description, due_date, priority, onEdit, onDelete } = props;
    
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ 
        id: id,
        data: {
            type: 'Task',
            task: props,
        }
    });
 
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 100 : 0,
        height: "300px"
    };



    useEffect(() => {
        if (isDragging) {
            sessionStorage.setItem("draggedTaskId", id);
            console.log(sessionStorage.setItem("draggedTaskId", id));
        }
    }, [isDragging, id]);

    function editForm() {
        onEdit(props);
    }
    
    function deleteForm() {
        onDelete(id);
    }



    
    return (
        <div 
            // 1. Assign the ref for DND Kit to track the DOM node
            ref={setNodeRef}
            // 2. Apply the dynamic style object calculated above
            style={style}
            // 3. Spread the listeners and attributes for drag functionality
            // Listeners handle mouse/touch events, attributes handle accessibility
            {...attributes}
            {...listeners}
             className={styles.cardParent}
        >
            <div className={styles.card}>
                <h3>{task}</h3>
                <p>{description}</p>
                <div className={styles.bottomSection}>
                    <p>Due: {due_date && new Date(due_date).toDateString() || 'N/A'}</p>
                    <p>Priority: {priority}</p>
                </div>
                <div className={styles.icons}>
                    <button className={clsx(styles.edit, styles['my-button'])} onClick={editForm}>
                        <EditIcon style={{ color: 'white' }} />
                    </button>
                    <button className={clsx(styles.delete, styles['my-button'])} onClick={deleteForm}>
                        <DeleteIcon style={{ color: 'white' }} />
                    </button>
                </div>
            </div>
        </div>
    );

}

export default DisplayCard;