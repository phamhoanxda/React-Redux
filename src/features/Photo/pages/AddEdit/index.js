import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import PhotoForm from "components/PhotoForm";
import Banner from "components/Banner";
import { useDispatch, useSelector } from "react-redux";
import { addPhoto, updatePhoto } from "features/Photo/photoSlice";
import { useHistory, useParams } from "react-router-dom";

AddEditPage.propTypes = {};

function AddEditPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { photoId } = useParams();
  const isAddMode = !photoId;
  //
  const editedPhoto = useSelector((state) =>
    state.photos.find((x) => x.id === +photoId)
  );

  const initialValues = isAddMode
    ? {
        title: "",
        categoryId: null,
        photo: "",
      }
    : editedPhoto;

  //
  const handleOnSubmit = (values) => {
    return new Promise((resolve) => {
      console.log("values: " + values);

      setTimeout(() => {
        if (isAddMode) {
          const action = addPhoto(values);
          console.log(action);
          dispatch(action);
        } else {
          const action = updatePhoto(values);
          dispatch(action);
        }
        history.push("/photos");
        resolve(true);
      }, 2000);
    });
  };

  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo" />
      <div className="photo-edit__form">
        {/* Do form rất phức tạp và hay có validation nên sẽ cho nó ra riêng */}
        <PhotoForm
          isAddMode={isAddMode}
          initialValues={initialValues}
          onSubmit={handleOnSubmit}
        />
      </div>
    </div>
  );
}

export default AddEditPage;
