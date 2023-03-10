import { Injectable } from '@nestjs/common';
// src/modules/jwtHandler.ts
import jwt from "jsonwebtoken";
import { tokenType } from "../constants";

@Injectable()
export class jwtHandler {
  //* 받아온 user_key를 담는 access token 생성
  static sign(user_key: number){
    const payload = {
      user_key,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "2h" });
    return accessToken;
  };
  

  //* token 검사
  static verify (token: string) {
    let decoded: string | jwt.JwtPayload;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error: any) {
      if (error.message === "jwt expired") {
        return tokenType.TOKEN_EXPIRED;
      } else if (error.message === "invalid token") {
        return tokenType.TOKEN_INVALID;
      } else {
        return tokenType.TOKEN_INVALID;
      }
    }

    return decoded;
  };
}

