import React, { useState } from "react";
import { assets, dummyUserData, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const user = dummyUserData;
  const loc = useLocation();

  const [img, setImg] = useState("");
  const [userImage, setUserImage] = useState(user?.image);

  const updateImg = async () => {
    if (img) {
      const newImg = URL.createObjectURL(img);
      setUserImage(newImg);
      setImg("");
    }
  };

  return (
    <div
      className="relative min-h-screen md:flex flex-col items-center pt-8
      max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm"
    >
      <div className="group relative">
        <label htmlFor="img">
          <img
            src={img ? URL.createObjectURL(img) : userImage || assets.testimonial_image_1}
            alt=""
            className="rounded-full w-20 h-20 object-cover"
          />

          <input
            type="file"
            id="img"
            accept="image/*"
            hidden
            onChange={(e) => setImg(e.target.files[0])}
          />

          <div
            className="absolute hidden top-0 right-0 left-0 bottom-0
            bg-black/10 rounded-full group-hover:flex items-center
            justify-center cursor-pointer"
          >
            <img src={assets.edit_icon} alt="" />
          </div>
        </label>
      </div>

      {img && (
        <button
          className="absolute top-0 right-0 flex p-2 gap-1 bg-primary/10
          text-primary cursor-pointer"
          onClick={updateImg}
        >
          Save
          <img src={assets.check_icon} alt="" width={13} />
        </button>
      )}

      <p className="mt-2 text-base max-md:hidden">{user?.name}</p>

      <div className="w-full">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
              link.path === loc.pathname
                ? "bg-primary/10 text-primary"
                : "text-gray-600"
            }`}
          >
            <img
              src={
                link.path === loc.pathname ? link.coloredIcon : link.icon
              }
              alt=""
            />

            <span className="max-md:hidden">{link.name}</span>

            <div
              className={`${
                link.path === loc.pathname && "bg-primary"
              } w-1.5 h-8 rounded-l right-0 absolute`}
            ></div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
