import React, { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import Button from '../ui/Button';
import { Upload, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface CloudinaryUploadProps {
    onUploadSuccess: (imageUrl: string, publicId: string) => void;
    currentImage?: string;
}

const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({
    onUploadSuccess,
    currentImage,
}) => {
    const [uploading, setUploading] = useState(false);

    return (
        <div className="space-y-4">
            <CldUploadWidget
                uploadPreset="ecommerce_products"
                onUpload={(result: any) => {
                    if (result.event === 'success') {
                        onUploadSuccess(result.info.secure_url, result.info.public_id);
                        setUploading(false);
                    }
                }}
                onOpen={() => setUploading(true)}
                onClose={() => setUploading(false)}
            >
                {({ open }) => (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => open()}
                        isLoading={uploading}
                    >
                        <Upload className="h-4 w-4 mr-2" />
                        {currentImage ? 'Cambiar Imagen' : 'Subir Imagen'}
                    </Button>
                )}
            </CldUploadWidget>

            {currentImage && (
                <div className="relative w-full h-64 border rounded-lg overflow-hidden">
                    <Image
                        src={currentImage}
                        alt="Preview"
                        fill
                        className="object-contain"
                    />
                </div>
            )}

            {!currentImage && (
                <div className="flex items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-center">
                        <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">No hay imagen seleccionada</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CloudinaryUpload;
