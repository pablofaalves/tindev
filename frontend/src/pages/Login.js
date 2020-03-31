import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/logo.svg';
import api from '../services/api';
import { useForm } from 'react-hook-form'

export default function Login({ history }) {
    const { register, handleSubmit, errors } = useForm()
    const [ username, setUsername ] = useState('');

    async function onSubmit() {
        const response = await api.post('/devs', {
            username
        });

        const { _id } = response.data.user;

        history.push(`/dev/${_id}`);
    }
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <img src={logo} alt="Tinder for Developers"/>
                <input ref={register({ required: true })}
                    name="username"
                    placeholder="Type your GitHub username..."  
                    value={username} onChange={e => setUsername(e.target.value) }/>
                {errors.username && <span>This field is required</span>}
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}