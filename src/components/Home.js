import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'; 

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}> Blog Posts</h1>
            <div className={styles.cardContainer}>
                {posts.map(post => (
                    <div key={post.id} className={styles.card}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <Link to={`/post/${post.id}`} className={styles.link}>Read More</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
