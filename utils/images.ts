import { btoa } from "buffer";

export const imageToBuffer = (image: string) => {
    // const string = "data:image/png;base64,long-String"
    // const bindata = new Buffer(image.split(",")[1], "base64");
    return new Buffer(image, 'base64')
}

export const BufferToImage = (image: Buffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(image)));
}