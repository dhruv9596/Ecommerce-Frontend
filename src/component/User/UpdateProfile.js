import React, { Fragment, useState, useEffect} from "react";
import "./UpdateProfile.css";
import MetaData from '../layout/MetaData';
import Loader from "../layout/Loader/loader";
import { Link  , useNavigate } from "react-router-dom";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile} from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate =  useNavigate();
  const { user } = useSelector(
    (state) => state.user
  );
  console.log('User in up ', user);
  const { loading , isUpdated , error } = useSelector(
    (state) => state.profile
    );
  console.log('profile in up error',error);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    // myForm.set("name", name);
    // myForm.set("email", email);
    // myForm.set("avatar", avatar);
    
    const data = {name,email}
    console.log('My Form ' , data);
    dispatch(updateProfile(data));
  };
  const updateProfileDataChange = (e) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
  };
  useEffect(() => {
    if( user ){
      setName(user?.name);
      setEmail(user?.email);
      setAvatarPreview(user?.avatar?.url);
    }
    if (error) {
      dispatch(clearErrors());
      console.log("Toast ", toast.error);
    }    
    if (isUpdated) {
      toast.success("Profile Updated Successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log('User ;:::::::::' , user);
      dispatch( loadUser());
      navigate("/account");
      dispatch({
        type : UPDATE_PROFILE_RESET,
      })
    }
  }, [dispatch, navigate,  error, user , isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default UpdateProfile