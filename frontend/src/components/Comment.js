import { Link } from "react-router-dom";

function Comment(props) {
    return (
        <div className="mx-auto d-block text-left " >
            <div className="alert alert-secondary" role="alert">
                {props.comment.postedBy.username} :  {props.comment.content}
            </div>
        </div >
    )
}
export default Comment;