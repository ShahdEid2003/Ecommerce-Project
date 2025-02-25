import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useForm } from "react-hook-form";
import Loader from "../../../components/loader/loader";
import { toast } from "react-toastify";
import { UserContext } from "../../../components/user/context/UserContext";
import personalImage from "../../../assets/img/personalprofile.png";
import { useEffect } from "react";
export default function Image() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setImagePreview(user?.image?.secure_url);
  }, [user]);

  const updateImage = async (data) => {
    if (!data.image || data.image.length === 0) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      setIsLoading(true);

      const response = await axios.put(
        `${import.meta.env.VITE_BURL}/user/update-image`,
        formData,
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem("userToken")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Image updated successfully");
      }

      setUser((prevUser) => ({
        ...prevUser,
        image: {
          ...prevUser.image,
          secure_url: response.data.user.image.secure_url,
        },
      }));

      console.log(response);
    } catch (error) {
      toast.error("Error updating image");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Form
        onSubmit={handleSubmit(updateImage)}
        encType="multipart/form-data"
        className="shadow container p-5"
      >
        <Form.Group controlId="updateImage">
          <Form.Label>Update Profile Picture</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            onChange={handleImageChange}
          />
          {errors.image && (
            <p className="text-danger">{errors.image.message}</p>
          )}
        </Form.Group>

        <div className="mt-3">
          <img
            src={imagePreview || user?.image?.secure_url || personalImage}
            alt="Profile img"
            width={200}
            className="border rounded"
          />
        </div>

        <Button type="submit" className="mt-3" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </Form>
    </>
  );
}
