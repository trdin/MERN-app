import { Link } from "react-router-dom";

function Photo(props) {
    return (
        <div className="card bg-dark mb-3 photo mx-auto d-block  " >
            <Link to={'/showPhoto/' + props.photo._id}>
                <img className="card-img " src={"http://localhost:3001/" + props.photo.path} alt={props.photo.name} />

                <div className="card-img-overlay text-left">
                    <h5 className="card-title"><span className="badge badge-secondary">{props.photo.name}</span></h5>
                    <div>{props.photo.tags?.map(tag => <span key={tag} className=" badge badge-secondary">{tag}</span>)}</div>
                </div>

            </Link >
            <div className="card-body bg-light text-left">
                <p>Op : {props.photo.postedBy.username}</p>
                <p>time posted : {props.photo.timeCreated}</p>
            </div>
        </div >
    )
}
export default Photo;