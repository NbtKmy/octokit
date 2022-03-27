import { Buffer } from 'buffer';
import { createCipheriv, createDecipheriv } from 'crypto-browserify';


const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY; 


export function encrypt(text) {
 let iv = Buffer.alloc(0);

 let cipher = createCipheriv('aes-256-ecb', Buffer.from(ENCRYPTION_KEY), iv);
 let encrypted = cipher.update(text);

 encrypted = Buffer.concat([encrypted, cipher.final()]);

 return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(text) {
 let textParts = text.split(':');
 let ivstring = Buffer.from(textParts.shift(), 'hex');
 let encryptedText = Buffer.from(textParts.join(':'), 'hex');
 let decipher = createDecipheriv('aes-256-ecb', Buffer.from(ENCRYPTION_KEY), ivstring);
 let decrypted = decipher.update(encryptedText);

 decrypted = Buffer.concat([decrypted, decipher.final()]);

 return decrypted.toString();
}

