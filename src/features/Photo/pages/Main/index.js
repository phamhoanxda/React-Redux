import React, { useState } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import Banner from "components/Banner";
import Images from "constants/images";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PhotoList from "features/Photo/components/PhotoList";
import { removePhoto } from "features/Photo/photoSlice";

MainPage.propTypes = {};

function MainPage(props) {
  const photos = useSelector((state) => state.photos);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log("List: ", photos);

  const handlePhotoEditClick = (photo) => {
    console.log("Edit: ", photo);
    history.push(`/photos/${photo.id}`);
  };

  const handlePhotoRemoveClick = (photo) => {
    console.log("Remove: ", photo);
    const removePhotoId = photo.id;
    const action = removePhoto(removePhotoId);
    dispatch(action);
  };

  return (
    <div className="photo-main">
      <Banner title="Your awesome photos" backgroundUrl={Images.PINK_BG} />
      <Container className="text-center">
        <Link to="/photos/add">Add new photo</Link>
        <PhotoList
          photoList={photos}
          onPhotoEditClick={handlePhotoEditClick}
          onPhotoRemoveClick={handlePhotoRemoveClick}
        />
      </Container>
    </div>
  );
}

export default MainPage;
