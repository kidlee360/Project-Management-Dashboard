import { useState, useRef, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from '@/views/partials/card.module.css';
import clsx from 'clsx';


function EditCard(props: any) {
    const cardRef = useRef<HTMLDivElement>(null);

    function cancelEdit() {
        props.onCancel();
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                cancelEdit();
            }
        }

        //don't quite understand why the event listener below was added and 
        //then removed but it seems like a crucial logic to prevent errors
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [cardRef]);

    const [eCard, setCard] = useState({
        id: props.id,
        task: props.task,
        description: props.description,
        due_date: props.due_date,
        priority: props.priority,
        columnName: props.columnName
    });

    // 💡 CRITICAL FIX: Sync local state when props change
    // This runs when the task ID changes (e.g., if you switch to edit a different task)
    // and ensures the form is always initialized with the correct, fresh data.
    useEffect(() => {
        setCard({
            id: props.id,
            task: props.task,
            description: props.description,
            due_date: props.due_date,
            priority: props.priority,
            columnName: props.columnName
        });
    }, [props.id, props.task, props.description, props.due_date, props.priority, props.columnName]); 
    // Added all data props to the dependency array to ensure the form updates if the 
    // parent component happens to send new data without changing the ID (less common, but safe).

    function submitForm() {
        props.onSave(eCard);
        cancelEdit();
    }


    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;

        setCard((prevCard) => {
            const newCard = {
                ...prevCard,
                [name]: value
            };
            console.log(newCard);
            return newCard;
        });
    }

    return (
            <div ref={cardRef} className={styles.cardParent} style={{height: "300px" }}>
                <div className={styles.card}>
                   <input className={styles.input}
                      type="text"
                      name="task"
                      value={eCard.task}
                      onChange={handleChange}
                      placeholder="Add a task"
                      style={{background: "transparent"}}
                   />

                   <input className={styles.input}
                    type="text"
                     name="description"
                       value={eCard.description}
                       onChange={handleChange}
                     placeholder="Add a description"
                     style={{ background: "transparent"}}
                     />
                     <div className={styles.bottomSection} >

                    <input className={clsx(styles.input, styles.date)} 
                        type="date"  
                        onChange={handleChange}
                        value={eCard.due_date}
                        name="due_date" 
                    />
                    <select className={clsx(styles.select,styles.priority)} 
                        name="priority"
                        value={eCard.priority}
                        onChange={handleChange}
                    >
                        <option value="" disabled hidden>Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    </div>



                    <div className={`${styles.icons}`}>
                          <button className={clsx(styles.add, styles['my-button'])} onClick={submitForm}>
                              <AddIcon style={{ color: 'white' }} />
                          </button>
                    </div>    
                </div>
            </div>
    );
};

export default EditCard;