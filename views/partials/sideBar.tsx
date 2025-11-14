import LowPriorityIcon from '@mui/icons-material/LowPriority';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import styles from '@/views/partials/bars.module.css';
import {useState} from 'react';


export default function SideBar(props: any){
  const [active, setActive] = useState("");
  
  function highPriority(){
    setActive(active === "high"?"":"high");
    props.sideBarClick(active)
  }

  function lowPriority(){
    setActive(active === "low"?"":"low");
    props.sideBarClick(active)
  }

  function dueDate(){
    setActive(active === "date"?"":"date");
    props.sideBarClick(active)
  }


    return(
    <div className={props.className}>
    <div className={styles.container}>
        <button className={styles.myButton} style={{backgroundColor: active === "high"? "rgba(34, 30, 30, 0.2)": ''}} onClick={highPriority}>
          <PriorityHighIcon style={{color: "white"}}/>
        </button>        
        <button className={styles.myButton} style={{backgroundColor: active === "low"? "rgba(34, 30, 30, 0.2)": ''}} onClick={lowPriority}>
          <LowPriorityIcon style={{color: "white"}}/>
        </button>
        <button className={styles.myButton} style={{backgroundColor: active === "date"? "rgba(34, 30, 30, 0.2)": ''}} onClick={dueDate}>
          <PendingActionsIcon style={{color: "white"}} />
        </button>
    </div>
    </div>
    );
    
}