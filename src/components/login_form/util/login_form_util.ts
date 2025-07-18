import axios from "axios";

export interface BodyLogin {
  user_name: string;
  password: string;
}

export class LoginUtil {
  static capitalizeWords(str: string): string {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  static gatSessionValues(message: string): Promise<string[]> {
    try {
      const values = message.split(",").map((value: string) => value.trim());

      const arrayValues = [
        values[1].split("admin:")[1]?.trim(),
        values[2].split("user_id:")[1]?.trim(),
        values[3].split("username:")[1]?.trim(),
        values[4].split("full_name:")[1]?.trim(),
      ];

      return Promise.resolve(arrayValues);
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener valores de sesión");
    }
  }

  static async login(body: BodyLogin): Promise<string> {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        body,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        return response.data.message;
      } else {
        throw new Error("Error al iniciar sesión");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error al iniciar sesión");
    }
  }

  static async logout(): Promise<string> {
    try {
      const response = await axios.get("http://localhost:3000/auth/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        return response.data.message;
      } else {
        throw new Error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error al cerrar sesión");
    }
  }

  static async sessionDecode(): Promise<string> {
    try {
      const response = await axios.get("http://localhost:3000/auth/session", {
        withCredentials: true,
      });
      if (response.status === 200) {
        return response.data.message;
      } else {
        throw new Error("Error al decodificar sesión");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error al decodificar sesión");
    }
  }
}
