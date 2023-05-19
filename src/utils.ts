import React from "react";

export const handleFile = (
  event: React.ChangeEvent<HTMLInputElement>,
  setFileName: React.Dispatch<React.SetStateAction<string>>,
  setThumbnail: React.Dispatch<React.SetStateAction<string>>
) => {
  const selectedFile = event.target.files?.[0];
  if (selectedFile) {
    setFileName(selectedFile.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      const thumbnailUrl = reader.result as string;
      setThumbnail(thumbnailUrl);
    };
    reader.readAsDataURL(selectedFile);
  }
};
