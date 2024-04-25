import * as bcrypt from 'bcrypt';
import { config } from "config/config";

export class CryptoService {
	getHash(text: string): string {
		return bcrypt.hashSync(text, config.HashSaltRound);
	}

	compareHash(text: string, hash: string): boolean {
		return bcrypt.compareSync(text, hash);
	}
}
