export type AlgorithmType = 'HS256' | 'RS256';

interface IJwtConfig {
  secretKey: string;
  algorithm: AlgorithmType;
  expiresIn: string | number;
}

export const jwtConfig: IJwtConfig = {
  secretKey: process.env.JWT_SECRET_KEY,
  algorithm: 'HS256',
  expiresIn: '1h',
};
