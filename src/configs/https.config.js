import { getDirName } from "../utils/helper.util.js";
import fs from 'fs';
import path from 'path';

const __dirname = getDirName(import.meta.url);

export const serverOpts = {
	// Certificate(s) & Key(s)
	cert: fs.readFileSync(path.join(__dirname, '../../certs/cert.pem')),
	key: fs.readFileSync(path.join(__dirname, '../../certs/private.pem')),

	// TLS Versions
	maxVersion: 'TLSv1.3',
	minVersion: 'TLSv1.3',

	// Hardened configuration
	ciphers: 'TLS_AES_256_GCM_SHA384:TLS_AES_128_GCM_SHA256',
	ecdhCurve: 'P-521:P-384',
	sigalgs: 'ecdsa_secp384r1_sha384',

	// Attempt to use server cipher suite preference instead of clients
	honorCipherOrder: true
}