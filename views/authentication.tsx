import {useState} from 'react';
import styles from '@/views/HomeComponent.module.css';



export default function Component(props: any){
    const [account, setAccount] = useState(false)
    const [form, setForm] = useState({
        userName: "",
        email: "",
        password: ""
    })

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        setForm((prevForm) => {
            const newForm = {
                ...prevForm,
                [name]: value
            };
            console.log(newForm);
            return newForm;
        });
    }

    function submitForm(){
        props.userForm(form, account);
        setForm({
            userName: "",
            email: "",
            password: ""
        })
    }

    function changeAccount(){
        setAccount(prevAccount => !prevAccount);
    }



    return(
        <div className={styles.form}>
            <h1>Sign {account? 'In' : 'Up'}</h1>
            <input className={styles.input} name='userName' type="text" value={form.userName} onChange={handleChange} placeholder="username" />
            <input className={styles.input} name='email' type="text" value={form.email} onChange={handleChange} placeholder="email" />
            <input className={styles.input} name='password' type="text" value={form.password} onChange={handleChange} placeholder="password" />
            <button className={styles.button} type="submit" onClick={submitForm}>submit</button>
            <span>{account? "don't":'already'} have an account? <span onClick={changeAccount} style={{textDecoration: 'underline'}}>sign {account? 'up' : 'in'}</span></span>
        </div>
    )
}