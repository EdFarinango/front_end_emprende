import { useNavigate } from "react-router-dom";
import '../video/card.css'
const Card = () => {
  const navigate = useNavigate();
  return (
    <div
      className="videoCard_container"
      //onClick={() => navigate(`/singleVideoPage/${_id}`)}
    >
      <div className="videoCard">
        <img src='{thumbNail}' alt="" className="videoCard_thumbnail" />
      </div>
      
        <div className="videoCard_body_content">
          <h3>Uno</h3>
          <small>Dos</small>
          <div>
            <small>112 views</small>
            <small> • </small>
            <small>7 days ago</small>
          </div>
        </div>
      </div>
      );
};

export default  Card ;
