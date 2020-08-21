import React from "react";
import {FaStar} from 'react-icons/fa'
import './StarComponent.css'

function StarComponent(props) {
  const [star, setStar] = React.useState(+props.star);
  const [hover, setHover] = React.useState(-1);
  const updateStar = (index) => {
    setStar(index)
    props.updateRating(props.index, index)
  }
  return (
    <>
      {[0, 1, 2, 3, 4, 5].map((s, index) => {
        return (
          <span
            className="stars"
            onMouseOver={() => {
              setHover(index);
            }}
            onMouseOut={() => setHover(-1)}
            onClick={() => updateStar(index)}
            key={s}
          >
            <span
              className={
                (hover === -1 && index && index > 0 && index <= star) ||
                (index <= hover && index !== 0)
                  ? `activeStar`
                  : ""
              }
            >
              <FaStar />
            </span>
          </span>
        );
      })}
    </>
  );
}

export default StarComponent;
