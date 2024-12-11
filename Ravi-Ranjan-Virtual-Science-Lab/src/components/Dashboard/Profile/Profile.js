import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { db, storage } from "../../../configs/firebase";

const Profile = () => {
  const { auth } = useSelector((state) => state);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const [progress, setProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleProfile,
    formState: { errors },
  } = useForm();

  // get users data
  useEffect(() => {
    let unsubscribe;

    unsubscribe = db
      .collection("users")
      .where("email", "==", auth?.user?.email)
      .onSnapshot((snapshot) => {
        setUser(snapshot?.docs[0]?.data());
        setUserId(snapshot?.docs[0].id);
      });

    return () => {
      unsubscribe();
    };
  }, [auth?.user?.email]);

  const onFileChange = (e) => {
    const image = e.target.files[0];

    if (image) {
      setShowProgressBar(true);
      const uploadTask = storage.ref(`users/${image.name}`).put(image);

      // getting the upload status while the image is uploading
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          // error function
          console.log(error);
        },
        () => {
          // completion function
          storage
            .ref("users")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("users").doc(userId).update({
                avatar: url,
              });
              setProgress(0);
              setShowProgressBar(false);
            });
        }
      );
    } else {
      toast.error("Please select an image");
    }
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
    };

    try {
      db.collection("users").doc(userId).update(payload);
      toast.success("Your profile has been successfully updated");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="flex-1 xl:overflow-y-auto font-body">
      <div className="max-w-4xl mx-auto py-6 px-6 lg:px-8">
        <form
          className="space-y-8 divide-y divide-y-blue-gray-200"
          onSubmit={handleProfile(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <div className="sm:col-span-6">
              <h2 className="text-2xl font-semibold text-brand-900">profile</h2>
              <p className="mt-1 text-sm text-blue-gray-500">
                This information will be publicly displayed so you provide key
                information Be careful what you do.
              </p>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="photo"
                className="block text-sm sm:text-base font-medium text-blue-gray-900"
              >
                picture
              </label>
              {showProgressBar && (
                <LinearProgress
                  variant="determinate"
                  className="mt-4"
                  value={progress}
                  max="100"
                />
              )}
              <div className="mt-2 flex items-center">
                <img
                  className="inline-block object-cover object-center w-36 h-36 rounded-full"
                  src={user?.avatar}
                  alt=""
                />
                <div className="ml-4 flex  cursor-pointer ">
                  <div className="relative py-2 px-4 cursor-pointer border-gray-300 rounded-md shadow-sm flex items-center border border-transparent text-sm sm:text-base font-medium text-white transition-colors duration-300 bg-brand-900 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                    <label
                      htmlFor="user-photo"
                      className="relative pointer-events-none"
                    >
                      <span className="text-sm font-semibold text-gray-100 tracking-wide cursor-pointer">
                        change
                      </span>
                    </label>
                    <input
                      id="user-photo"
                      name="user-photo"
                      type="file"
                      onChange={onFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="displayName"
                className="block text-sm sm:text-base font-medium text-blue-gray-900"
              >
                full name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="your full name"
                defaultValue={user?.name}
                {...registerProfile("name", {
                  required: "Name is required",
                  minLength: {
                    value: 6,
                    message: "Name must be minimum 6 characters",
                  },
                })}
                className={`mt-2 block w-full border-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm ${
                  errors.name
                    ? "focus:border-red-500 focus:ring-red-500"
                    : "focus:border-blue-500 focus:ring-blue-500"
                } `}
              />

              <span className="flex items-center font-medium tracking-wide text-red-500 text-sm mt-1 ml-1">
                {errors.name && errors.name.message}
              </span>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="description"
                className="block text-sm sm:text-base font-medium text-blue-gray-900"
              >
                about me
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  defaultValue={user?.description}
                  placeholder="Write something about yourself ...."
                  {...registerProfile("description")}
                  rows={3}
                  className="block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm text-blue-gray-900 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <p className="mt-3 text-sm text-blue-gray-500">
                Short description for your profile
              </p>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="institution"
                className="block text-sm sm:text-base font-medium text-blue-gray-900"
              >
                Educational institutions
              </label>
              <input
                type="text"
                name="institution"
                id="institution"
                placeholder="Your educational institution"
                {...registerProfile("institution")}
                defaultValue={user?.institution}
                className="mt-2 block w-full border-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="pt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <div className="sm:col-span-6">
              <h2 className="text-xl font-medium text-blue-gray-900">
                Personal information
              </h2>
              <p className="mt-1 text-sm text-blue-gray-500">
                This information will be private and secure so be careful about
                it No.
              </p>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm sm:text-base font-medium text-blue-gray-900"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="your email"
                defaultValue={user?.email}
                disabled
                className="mt-2 block w-full border-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="phone"
                className="block text-sm sm:text-base font-medium text-blue-gray-900"
              >
                phone number
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Your phone number"
                defaultValue={user?.phone}
                {...registerProfile("phone", {
                  required: "Phone number is required",
                  minLength: {
                    value: 10,
                    message: "Phone number should be minimum 10 digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone number maximum 10 digits can be given",
                  },
                })}
                className={`mt-2 block w-full border-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm ${
                  errors.phone
                    ? "focus:border-red-500 focus:ring-red-500"
                    : "focus:border-blue-500 focus:ring-blue-500"
                } `}
              />

              <span className="flex items-center font-medium tracking-wide text-red-500 text-sm mt-1 ml-1">
                {errors.phone && errors.phone.message}
              </span>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="address"
                className="block text-sm sm:text-base font-medium text-blue-gray-900"
              >
                current address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Your current address"
                defaultValue={user?.address}
                {...registerProfile("address", {
                  required: "Current address is required",
                  minLength: {
                    value: 6,
                    message: "Current address must be minimum 6 characters",
                  },
                })}
                className={`mt-2 block w-full border-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm ${
                  errors.address
                    ? "focus:border-red-500 focus:ring-red-500"
                    : "focus:border-blue-500 focus:ring-blue-500"
                } `}
              />

              <span className="flex items-center font-medium tracking-wide text-red-500 text-sm mt-1 ml-1">
                {errors.address && errors.address.message}
              </span>
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2.5 px-6 border border-transparent shadow-sm text-sm sm:text-base font-semibold rounded-md text-white transition-colors duration-300 bg-brand-900 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            >
              update{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-6 w-6 text-sm sm:text-base font-medium text-gray-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
