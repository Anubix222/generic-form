import { IConnectionMode } from "../types/forms.types";
import axios from 'axios'
import { env } from "../config";
//import { obtenerDatosPorLlave } from "@/app/user-interfaces/forms/models/controllers";

interface Props {
  name: string
  url?: string
  urlCompleta?: string
  connectionMode?: IConnectionMode
}


export const getItems = async ({
  name,
  url,
  urlCompleta,
  connectionMode,
}: Props): Promise<any> => {
  try {
    const { data } = await axios.get(
      urlCompleta || `${env.ENV_SERVER_URL}/${url}`
    );
    return Array.isArray(data)
      ? data
      : JSON.parse(localStorage.getItem(url ?? name) ?? "{}") ?? [];
  } catch (error: any) {
    const fallback = JSON.parse(localStorage.getItem(url ?? name) ?? "{}");
    //const fallback = url
    //  ? await obtenerDatosPorLlave("nom_concepto", "idpadre", url)
    //  : [];

    //
    return Array.isArray(fallback) ? fallback : [];
  };
}
