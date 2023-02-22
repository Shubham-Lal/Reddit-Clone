import { useState } from "react";
import Compressor from 'compressorjs';

const useSelectFile = () => {
    const [selectedFile, setSelectedFile] = useState<string>();
    const [imageUploaded, setImageUploaded] = useState(false);

    const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();

        if (!event.target.files?.[0]) return;
        setImageUploaded(false);
        const image = event.target.files[0];
        if (image.size < 1048487) {
            reader.readAsDataURL(image);
        }
        else {
            new Compressor(image, {
                quality: 0.6,
                width: 900,
                height: 500,
                success: (res) => {
                    reader.readAsDataURL(res);
                },
            });
        }
        reader.onload = (readerEvent) => {
            if (readerEvent.target?.result) {
                setSelectedFile(readerEvent.target.result as string);
            }
        }
    };

    return {
        selectedFile,
        setSelectedFile,
        onSelectFile,
        imageUploaded,
        setImageUploaded
    }
}
export default useSelectFile;