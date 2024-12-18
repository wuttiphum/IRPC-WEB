import JSEncrypt from 'jsencrypt';


const publicKey = process.env.NEXT_PUBLIC_JWT_PUBLIC_KEY || ""
const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY || ""


export async function hashUserData(data: any) {
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey);
    return encryptor.encrypt(JSON.stringify(data));
}


export function decryptHashData(token: string) {
    const decryptor = new JSEncrypt();
    decryptor.setPrivateKey(secretKey);
    return decryptor.decrypt(token);
}