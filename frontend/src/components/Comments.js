import Comment from './Comment';

function Comments(props) {


    return (
        <div>
            <h3>Comments:</h3>
            <>
                {props.comments?.map(comment => (<Comment comment={comment} key={comment._id}></Comment>))}
            </>
        </div >
    );
}

export default Comments;