import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Main.css';
import api from '../services/api';
import logo from '../assets/logo.svg';
import imgLike from '../assets/like.svg';
import imgDislike from '../assets/dislike.svg';

export default function Main( { match } ) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: { user: match.params.id }
            });
    
            setUsers(response.data);
        }

        loadUsers();
    }, [match.params.id])

    useEffect(() => {
        const socket = io('http://localhost:3333', {
            query: { userId: match.params.id }
        })

        console.log('Entrou ' + match.params.id);

        socket.on('match', message => {
            console.log(message);
            alert(message);
        });
    }, [match.params.id]);
    

    async function handleLike(id) {
        console.log('Liked Dev Id: ' + id + ' | user ID: ' + match.params.id);
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id }
        });
        
        setUsers(users.filter(user => user._id !== id));
    }

    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id }
        });

        setUsers(users.filter(user => user._id !== id));
    }

    window.addEventListener("beforeunload", (ev) => 
    {  
        ev.preventDefault();
        return ev.returnValue = 'Are you sure you want to close?';
    });

    return (
        <div className="main-container">
            <Link to='/'>
                <img src={logo} alt="Tinder for Developers" />
            </Link>
            { users.length > 0 ? (
                <ul>
                {users.map(user => (
                    <li key={user._id}>
                        <img src={user.avatar} alt={user.name} />
                        <footer>
                            <strong>{user.name}</strong>
                            <p>{user.bio}</p>
                        </footer>
                        <div className="buttons">
                            <button type="button" onClick={() => handleDislike(user._id)}>
                                <img src={imgDislike} alt="Dislike"/>
                            </button>
                            <button type="button" onClick={() => handleLike(user._id)}>
                                <img src={imgLike} alt="Like"/>
                            </button>
                        </div>
                    </li>
                ))}
                </ul>
            ) : (
                <div className="empty">No more Developers available...</div>
            )}
        </div>
    )
}