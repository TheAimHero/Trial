"use client";
import { FieldValues, useForm } from "react-hook-form";

import React from "react";

const UploadForm = (props: {}) => {
  const { register, handleSubmit } = useForm();

  function handleUpload(values: FieldValues) {
    const formData = new FormData();
    console.log(values);
    const fileList = values.img as FileList;
    for (let i = 0; i < fileList.length; i++) {
      formData.append("img", fileList[i]);
    }
    fetch("/api", { method: "POST", body: formData });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleUpload)}>
        <div className="mb-4 flex flex-col gap-4">
          <label htmlFor="img">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("img", { required: true })}
            multiple
            capture="environment"
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadForm;
