import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useForm } from "react-hook-form";
import Loader from "../../../components/loader/loader";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../../components/user/context/UserContext";

export default function Image() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { user, loading } = useContext(UserContext);

  const updateImage = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('image', data.image);
      const response = await axios.put(
        "https://ecommerce-node4.onrender.com/user/update-image",
        formData,
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem("userToken")}`,
          }
        }
      );
      if (response.status == 200) {
        toast.success("Image updated successfully");
      }
    } catch (error) {
      toast.error("Error updating image");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading ) {
    <Loader />;
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImagePreview(URL.createObjectURL(file));
  };
  return (
    <>
      <Form
        onSubmit={handleSubmit(updateImage)}
        encType="multipart/form-data"
        className="shadow p-5"
      >
        <Form.Group controlId="updateImage">
          <Form.Label>update profile picture</Form.Label>
          <Form.Control
            type="file"
            {...register("image")}
            onChange={handleImageChange}
          ></Form.Control>
        </Form.Group>
        {errors.image && <p className="text-danger">{errors.image.message}</p>}
        {/* {imagePreview ? (
          <img src={imagePreview} width={200} />
        ) : (
          <img src={user.image.secure_url} width={200} />
        )} */}
        <Button type="submit" className="mt-3">
          update
        </Button>
      </Form>
    </>
  );
}
