import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import "./RamdomPhoto.scss";

RandomPhoto.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  onImageUrlChange: PropTypes.func,
  onRanDomButtonBlur: PropTypes.func,
};

const getRandomImageUrl = () => {
  const randomId = Math.trunc(Math.random() * 2000);
  return `https://picsum.photos/id/${randomId}/300/300`;
};

function RandomPhoto(props) {
  const { name, imageUrl, onImageUrlChange, onRanDomButtonBlur } = props;

  const handleRandomPhotoClick = async () => {
    if (onImageUrlChange) {
      const randomImageUrl = getRandomImageUrl();
      onImageUrlChange(randomImageUrl);
    }
  };

  return (
    <div className="random-photo">
      <div className="random-photo__button">
        <Button
          outline
          name={name}
          color="primary"
          onBlur={onRanDomButtonBlur}
          onClick={handleRandomPhotoClick}
        >
          Random Photo
        </Button>
      </div>
      <div className="random-photo__photo">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Oops ... not found. Please click again"
            onError={handleRandomPhotoClick}
          ></img>
        )}
      </div>
    </div>
  );
}

export default RandomPhoto;
