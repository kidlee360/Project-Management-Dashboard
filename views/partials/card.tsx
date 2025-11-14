import { useState, useRef, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from '@/views/partials/card.module.css';
import clsx from 'clsx';


function Card(props: any) {
    const [isExpanded, setExpanded] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    function expand() {
        setExpanded(true);
    }

    function collapse() {
        setExpanded(false);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                collapse();
            }
        }

        //don't quite understand why the event listener below was added and 
        //then removed but it seems like a crucial logic to prevent errors
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [cardRef]);

    const [card, setCard] = useState({
        task: "",
        description: "",
        due_date: "",
        priority: "",
        columnName: props.columnName
    });

    function submitForm() {
        props.onAdd(card);
        setCard({
            task: "",
            description: "",
            due_date: "",
            priority: "",
            columnName: props.columnName
        });
        collapse();
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
            <div ref={cardRef} className={styles.cardParent} style={{height: isExpanded? "300px": '' }}>
                <div className={styles.card}>
                   <input className={styles.input}
                      type="text"
                      name="task"
                      value={card.task}
                      onChange={handleChange}
                      onClick={expand}
                      placeholder="Add a task"
                      style={{background: "transparent"}}
                   />

                   <input className={styles.input}
                    type="text"
                     name="description"
                       value={card.description}
                       onChange={handleChange}
                     placeholder="Add a description"
                     style={{display: isExpanded? '': "none", background: "transparent"}}
                     />
                     <div className={styles.bottomSection} >

                    <input className={clsx(styles.input, styles.date)} style={{display: isExpanded? '': "none" }} 
                        type="date"  
                        onChange={handleChange}
                        value={card.due_date}
                        name="due_date" 
                    />
                    <select className={clsx(styles.select,styles.priority)} style={{display: isExpanded? '': "none" }}
                        name="priority"
                        value={card.priority}
                        onChange={handleChange}
                    >
                        <option value="" disabled hidden>Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    </div>



                    <div className={`${styles.icons}`}>
                          <button className={clsx(styles.add, styles['my-button'])} style={{display: isExpanded? '': "none"}} onClick={submitForm}>
                              <AddIcon style={{ color: 'white' }} />
                          </button>
                    </div>    
                </div>
            </div>
    );
};

export default Card;
