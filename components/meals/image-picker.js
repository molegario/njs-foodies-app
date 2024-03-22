"use client";
import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({ label, name }) {
  const imageInputRef = useRef(null);

  const [pickedImage, setPickedImage] = useState();

  function handlePickClick() {
    imageInputRef.current.click();
  }

  function handleImageChange(evt) {
    const file = evt.target.files[0];

    if(!file) {
      setPickedImage(null); // clears selected, preview
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return <div className={classes.picker}>
    <label htmlFor={name}>{label}</label>
    <div className={classes.controls}>
      <div className={classes.preview}>
        {
          !pickedImage && <p>No image picked yet</p>
        }
        {
          pickedImage && <Image src={pickedImage} alt="The selected image of meal" fill />
        }
      </div>
      <input 
        className={classes.input}
        type="file" 
        id={name} 
        accept="image/png, image/jpeg" 
        name={name}
        ref={imageInputRef}
        onChange={handleImageChange}
        required
      />
      <button 
        className={classes.button} 
        type='button'
        onClick={handlePickClick}
      >Pick an image</button>
    </div>
  </div>;
}