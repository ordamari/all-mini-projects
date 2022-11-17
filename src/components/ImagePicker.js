import { useId } from "react"
import { Icons } from "./Icons";

export function ImagePicker({
    img,
    setImg
}) {
    const id = useId();
    const uploadImage = (ev) => {
        setImg(ev.target.files[0])
    }

    return (
        <form className="image-picker">
            <input
                id={id}
                onChange={uploadImage}
                type="file"
                accept="image/*"
            />

            <label htmlFor={id}>
                {
                    img ? (
                        <img
                            src={typeof img === "string" ? img : URL.createObjectURL(img)}
                            alt="Preview"
                        />

                    ) : (
                        <div className="no-image" >
                            <Icons icon="dowloand" />
                            <div>Select a file or drag here</div>
                            <div className="button primary" >Please select an image</div>
                        </div>
                    )
                }


            </label>
        </form>
    )
}