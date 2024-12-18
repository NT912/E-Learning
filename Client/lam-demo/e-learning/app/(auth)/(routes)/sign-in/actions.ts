"use server";

import { loginSchema, LoginValues } from "@/lib/validation";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import axios from "axios";

export async function login(
  credentials: LoginValues,
): Promise<{  token?: string; error?: string }> {
  try {
    const { email, password } = loginSchema.parse(credentials);

    var url = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`;

    console.log(email+"  "+password);

    const response = await axios.post(url,{
        email, password
      });


      if (response.status === 201) {
        const token = response.data.data.description.token;
        return { token };
      }

      console.log("herer");
      return {
        error: "Wrong.",
      };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: "Incorrect account.",
    };
  }
}