import { ApiProperty } from "@nestjs/swagger";

export class TokensDto {
  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlJFQUxBRE1JTiIsImlkIjoxMywicm9sZXMiOlt7ImlkIjoxLCJ2YWx1ZSI6ImFkbWluIiwiZGVzY3JpcHRpb24iOiLQkNC00LzQuNC90LjRgdGC0YDQsNGC0L7RgCIsImNyZWF0ZWRBdCI6IjIwMjMtMDgtMThUMjA6MDM6MjAuNDU4WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDgtMThUMjA6MDM6MjAuNDU4WiIsIlVzZXJSb2xlcyI6eyJpZCI6MTIsInJvbGVJZCI6MSwidXNlcklkIjoxM319XSwiaWF0IjoxNjkyNDQ4NDc2LCJleHAiOjE2OTI1MzQ4NzZ9.tGkcwkrxUyrKmhY88DtGo1Ji-m4HTYFADj9EaJriyVc",
    description: "Access Token",
  })
  readonly accessToken: string;

  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlJFQUxBRE1JTiIsImlkIjoxMywiaWF0IjoxNjkyNDQ4NDc2LCJleHAiOjE2OTI1MzQ4NzZ9.l6uRmohXqi8nMRKk-_x3msfR6JQrfuUCU3XiFTSRY_U",
    description: "Refresh Token",
  })
  readonly refreshToken: string;
}
