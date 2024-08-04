'use client';

import { User } from "@/providers/AuthProvider";

import { initializeApp } from "firebase/app";
import mime from "mime-types";
import { getAuth, signInWithCustomToken, signOut } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseApp = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_CLOUD_STORAGE_API_KEY,
    storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_CLOUD_STORAGE_BUCKET_NAME}.appspot.com`,
});

class TrivialImageUploadError extends Error {
    constructor(message: string) {
        super(`image upload error: ${message}`);
    }
};

/**
 * Uploads an image file to Firebase Cloud Storage.
 * 
 * @param user 
 * @param fileObjectUrl 
 * @returns an object containing the following fields:
 * 
 *  - `src`: a public, downloadable URL of the uploaded image. Used for display on frontend only.
 *  - `filePath`: used when calling image model
 */
export async function uploadImageFile(user: User, localFile: File): Promise<{
    filePath: string,
}> {
    const fileMimeType = localFile.type;
    switch (fileMimeType) {
        case "image/png":
        case "image/jpeg":
        case "image/webp":
            break;
        
        default:
            throw new TrivialImageUploadError("File format not supported");
    }

    const fileExtension = mime.extension(fileMimeType);
    if (!fileExtension) {
        throw new TrivialImageUploadError("File format not supported");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/image-upload-token`, {
        method: 'GET',
        credentials: 'include',
    });
    const data = await res.json();
    if (res.status != 200) {
        throw new TrivialImageUploadError(data.message);
    }

    const firebaseCustomToken: string = data.token;
    const fileId: string = data.file_id;
    const firebaseAuth = getAuth(firebaseApp);
    await signInWithCustomToken(firebaseAuth, firebaseCustomToken);

    const today = new Date();
    const uploadDateString = today.toISOString().split('T')[0].split('-').join('/');

    const filePath = `frontend-uploaded/${uploadDateString}/user-${user.id}/${fileId}.${fileExtension}`;
    const fileRef = ref(getStorage(), filePath);

    const result = await uploadBytes(fileRef, localFile);
    // const downloadUrl = await getDownloadURL(result.ref);
    // console.log(`downloadUrl=${downloadUrl}`);
    signOut(firebaseAuth);
    return {
        filePath,
    };
}
