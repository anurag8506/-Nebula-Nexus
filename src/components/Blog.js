import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './Blog.module.css'; 

const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => {
                setBlog(response.data);
             
                axios.get(`https://jsonplaceholder.typicode.com/users/${response.data.userId}`)
                    .then(userResponse => {
                        setAuthor(userResponse.data);
                    })
                    .catch(error => {
                        console.error('Error fetching author:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching blog post:', error);
            });
    }, [id]);

    if (!blog || !author) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{blog.title}</h1>
            <p className={styles.content}>{blog.body}</p>
            <div className={styles.authorInfo}>
                <img src={`https://i.pravatar.cc/150?u=${author.email}`} alt="Author" className={styles.authorImage} />
                <div className={styles.authorDetails}>
                    <p>Written by <strong>{author.name}</strong></p>
                    <a href={`https://www.linkedin.com/in/${author.username}`} target="_blank" rel="noopener noreferrer" className={styles.linkedinLink}>
                        LinkedIn Profile
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Blog;
