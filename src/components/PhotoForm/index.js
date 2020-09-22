import React from "react";
import PropTypes from "prop-types";

import {
  Button,
  FormGroup,
  Input,
  Label,
  Container,
  Row,
  Spinner,
} from "reactstrap";

// import { PHOTO_CATEGORY_OPTIONS } from "../../constants/global";
// import Images from "../../constants/images";

import Images from "constants/images";
import { PHOTO_CATEGORY_OPTIONS } from "constants/global";
import { FastField, Form, Formik } from "formik";
import InputField from "customField/InputField";
import SelectField from "customField/SelectField";
import RandomPhotoField from "components/RandomPhotoField";

import * as Yup from "yup";

PhotoForm.propTypes = {
  onSubmit: PropTypes.func,
};

function PhotoForm(props) {
  const { initialValues, isAddMode } = props;

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("This field is required."),
    categoryId: Yup.number().required("This field is required").nullable(),
    photo: Yup.string().required("This field is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
    >
      {(formikProps) => {
        //Do somthing here...
        const { values, errors, touched, isSubmitting } = formikProps;
        console.log({ values, errors, touched });

        return (
          <Form>
            <FastField
              name="title"
              component={InputField}
              //
              label="Title"
              placeholder="Eg: Wow nature ..."
            />

            <FastField
              name="categoryId"
              component={SelectField}
              //
              label="Category"
              placeholder="What ' your photo category?"
              options={PHOTO_CATEGORY_OPTIONS}
            />
            <FastField
              name="photo"
              component={RandomPhotoField}
              label="Photo"
            />
            <FormGroup>
              <Button type="submit" color={isAddMode ? "primary" : "success"}>
                {isSubmitting && <Spinner size="sm" />}
                {isAddMode ? "Add to Album" : "Update your photo"}
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
}

export default PhotoForm;
