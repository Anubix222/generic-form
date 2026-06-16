# generic-form

Librería de formularios dinámicos para React basada en MUI v9, Formik y Yup. Genera formularios completos a partir de un array de controles con validaciones, soporte para modo edición, modales, internacionalización y notificaciones.

## Documentación

📖 [Ver documentación completa](https://anubix222.github.io/generic-form/)

## Instalación

```bash
npm install generic-form
# o
pnpm add generic-form
```

### Dependencias requeridas (peerDependencies)

```bash
pnpm add @emotion/react @emotion/styled @mui/material @mui/icons-material @mui/system @mui/x-date-pickers @yudiel/react-qr-scanner axios dayjs formik i18next is-mobile jotai notistack react-i18next react-number-format yup
```

## Configuración

Envuelve tu app con los proveedores necesarios en `main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LanguageProvider, Notifications } from "generic-form";
import "./i18n"; // tu configuración de i18next
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
      <Notifications />
    </LanguageProvider>
  </StrictMode>,
);
```

## Uso básico

```tsx
import { GenericForm } from "generic-form";

export const FormularioUsuario = () => (
  <GenericForm
    name="usuario"
    endpointPath="/api/usuarios"
    controls={[
      {
        type: "text",
        name: "nombre",
        label: "Nombre",
        gridValues: { xs: 12, sm: 6 },
        validations: { required: { message: "Este campo es requerido" } },
      },
      {
        type: "select",
        name: "rol",
        label: "Rol",
        gridValues: { xs: 12, sm: 6 },
        options: [
          { denominacion: "Admin", idconcepto: "admin" },
          { denominacion: "Usuario", idconcepto: "user" },
        ],
        validations: { required: { message: "Este campo es requerido" } },
      },
      {
        type: "check",
        name: "activo",
        label: "Activo",
        gridValues: { xs: 12, sm: 6 },
        defaultValue: true,
      },
    ]}
  />
);
```

## Tipos de controles disponibles

| Tipo           | Descripción                                         |
| -------------- | --------------------------------------------------- |
| `text`         | Campo de texto con soporte para multiline y pattern |
| `number`       | Campo numérico con formatos y prefijos              |
| `select`       | Selector simple                                     |
| `multiselect`  | Selector múltiple                                   |
| `autocomplete` | Autocomplete con búsqueda                           |
| `date`         | Selector de fecha                                   |
| `time`         | Selector de hora                                    |
| `radio`        | Radio buttons                                       |
| `check`        | Checkbox                                            |
| `switch`       | Switch                                              |
| `slider`       | Slider con rango                                    |
| `rating`       | Rating de estrellas                                 |
| `scanner`      | Escáner QR                                          |
| `component`    | Componente React personalizado                      |

## API pública

- `GenericForm` — componente principal
- `useModalState` — hook para controlar modales
- `LanguageProvider` — proveedor de internacionalización
- `Notifications` — proveedor de notificaciones
- `NotificationProvider` — hook para disparar notificaciones

## Licencia

MIT
