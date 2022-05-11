import { useContext, useState } from 'react'
import { Navigate } from 'react-router';
import { UserContext } from '../userContext';
import Button from './Button'
import Comment from './Comment';



function AddComment(props) {
    const userContext = useContext(UserContext);
    const [content, setContent] = useState('');
    const [commentShow, setCommentShow] = useState(true);
    const [comments, setComments] = useState(props.comments)

    const onClick = () => {
        setCommentShow(!commentShow)
    }


    async function onSubmit(e) {
        e.preventDefault();
        if (!content) {
            alert("input comment!");
            return;
        }
        const res = await fetch('http://localhost:3001/comments', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: content,
                photo: props.photoId
            })
        })
        const data = await res.json();
        if (data.content != undefined) {
            setComments([data, ...comments]);
            setContent("")
        }

    }

    return (
        <>{userContext.user ? <>
            <input type="submit" className="btn btn-primary mb-3" onClick={onClick} text="Add Comment" />
            {commentShow ? <form className="form-group text-left" onSubmit={onSubmit} >

                <input type="text" className="form-control mb-3" name="content" placeholder="comment somethin nice" value={content} onChange={(e) => { setContent(e.target.value) }} />

                <Button text="Add comment" />
            </form> : ""} </> : ""}
            <div id="comments-container text-left">
                {comments.map(comment => (<Comment comment={comment} key={comment._id}></Comment>))}
            </div>

        </>
    )
}

export default AddComment;