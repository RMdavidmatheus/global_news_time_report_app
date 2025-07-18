import axios from "axios";

export interface BodyTask {
  task_name: string;
  task_client: string;
  task_minutes: number;
}

export interface BodyAuditory {
  id_user: string;
  id_task: string;
}

export interface AuditoryModel {
  id: string;
  user: {
    id: string;
    admin: boolean;
    user_name: string;
  };
  task: {
    id: string;
    details: {
      task_name: string;
      task_client: string;
      task_initial_time: string;
      task_final_time: string;
      task_elapsed_time: string;
    };
  };
  status: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

export class ModalAddUtil {
  static async createTask(body: BodyTask): Promise<string> {
    try {
      const response = await axios.post("http://localhost:3000/tasks", body);
      if (response.status === 201) {
        return response.data.message;
      } else {
        throw new Error("Error al crear la tarea");
      }
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      throw error;
    }
  }

  static async createAuditory(body: BodyAuditory): Promise<string> {
    try {
      const response = await axios.post(
        "http://localhost:3000/auditories",
        body
      );
      if (response.status === 201) {
        return response.data.message;
      } else {
        throw new Error("Error al crear la auditoría");
      }
    } catch (error) {
      console.error("Error al crear la auditoría:", error);
      throw error;
    }
  }

  static async getAuditories(): Promise<AuditoryModel[]> {
    try {
      const response = await axios.get("http://localhost:3000/auditories");
      if (response.status === 200 || response.status === 204) {
        if (typeof response.data === "object") {
          return response.data as AuditoryModel[];
        }
        return [] as AuditoryModel[];
      } else {
        throw new Error("Error al obtener la auditoría");
      }
    } catch (error) {
      console.error("Error al obtener la auditoría:", error);
      throw error;
    }
  }

  static async updateAuditory(data: string[]): Promise<string> {
    try {
      const response = await axios.patch(
        "http://localhost:3000/auditories/auditory/status",
        data
      );
      if (response.status === 200) {
        return response.data.message;
      } else {
        throw new Error("Error al actualizar la auditoría");
      }
    } catch (error) {
      console.error("Error al actualizar la auditoría:", error);
      throw error;
    }
  }

  static async deleteTask(ids: string[]): Promise<string> {
    try {
      const response = await axios.delete("http://localhost:3000/tasks/task", {
        data: ids,
      });
  
      if (response.status === 200) {
        return response.data.message;
      } else {
        throw new Error("Error al eliminar la tarea");
      }
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      throw error;
    }
  }
}
