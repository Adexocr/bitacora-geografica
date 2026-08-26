Bitácora Geográfica

Aplicación móvil desarrollada con React Native, Expo y TypeScript, como parte del Laboratorio 2 (Integración de Hardware y Sensores) del curso Programación para Dispositivos Móviles (TPA-4001).

La aplicación permite capturar una fotografía con la cámara del dispositivo, registrar automáticamente la ubicación GPS en el momento de la captura, agregarle una descripción, y consultarla luego en una galería.


Tecnologías utilizadas
- React Native
- Expo con Expo Router (navegación por archivos)
- TypeScript
- expo-camera — acceso a la cámara del dispositivo
- expo-location — acceso al GPS
- React Context (useContext + useState) para compartir el estado de las fotos entre pantallas

Funcionalidades
Manejo de permisos: la aplicación solicita permisos de cámara y ubicación de forma independiente. Si el usuario deniega alguno, la app no falla: muestra un mensaje explicativo y, en el caso de la ubicación, permite guardar la foto igual, indicando que la ubicación no está disponible en vez de mostrar datos falsos.
Captura de foto: acceso directo a la cámara trasera del dispositivo para tomar la fotografía.
Lectura de GPS en el momento de la captura: al confirmar el guardado de la foto, se registran latitud y longitud actuales.
Descripción: cada foto puede llevar una breve descripción de texto antes de guardarse.
Galería: pantalla separada donde se listan todas las fotos capturadas en la sesión, mostrando imagen, coordenadas (o aviso de no disponibles), descripción y fecha/hora de captura.
Estado compartido entre pantallas: las fotos capturadas se guardan mediante un Context de React, por lo que aparecen automáticamente en la galería sin necesidad de recargar la app.

Estructura del proyecto
bitacora-geografica/
├── app/
│   ├── _layout.tsx              # Layout raíz, envuelve la app con el PhotosProvider
│   └── (tabs)/
│       ├── _layout.tsx           # Configuración de las dos pestañas
│       ├── index.tsx             # Pantalla "Capturar"
│       └── galeria.tsx           # Pantalla "Galería"
├── components/
│   ├── Camera.tsx                 # Componente de cámara, aislado
│   └── LocationReader.tsx         # Función de lectura de coordenadas GPS
├── context/
│   └── PhotosContext.tsx          # Estado compartido de las fotos capturadas
├── types/
│   └── Photo.ts                    # Definición del tipo de dato "Photo"
└── package.json

Instalación y ejecución
Requisitos previos
Node.js (versión LTS)
La app Expo Go instalada en un dispositivo Android físico (recomendado para esta app, ya que usa cámara y GPS reales)

Pasos
Clone el repositorio:
bash
   git clone https://github.com/Adexocr/bitacora-geografica.git
   cd bitacora-geografica
Instale las dependencias:
bash
   npm install
Inicie el servidor de desarrollo:
bash
   npx expo start
Escanee el código QR que aparece en la terminal con la app Expo Go desde su celular.

Cómo probar la aplicación en un dispositivo físico
Abra la app en tu celular a través de Expo Go, siguiendo los pasos de instalación anteriores.
En la pestaña Capturar, la app va a solicitar permiso para usar la cámara.
Si lo acepta, se abre la vista de cámara.
Si lo deniega, se muestra un mensaje indicando que se necesita el permiso, con un botón para volver a solicitarlo.
Toque el botón para tomar la foto.
La app solicita permiso de ubicación.
Si lo acepta, la foto se guardará junto con las coordenadas GPS actuales.
Si lo denega, la foto se guarda igual, mostrando "Sin coordenadas" en lugar de coordenadas.
Escriba una breve descripción de la foto y toque "Guardar foto".
Vaya a la pestaña Galería para verificar que la foto aparece con su imagen, descripción, fecha y coordenadas (o el aviso de que no están disponibles).
Repeta el proceso varias veces para confirmar que se pueden guardar múltiples fotos sin problema.

Prueba recomendada de manejo de permisos

Para verificar específicamente el criterio de manejo de permisos, se recomienda:

Ir a Ajustes del celular → Aplicaciones → Expo Go → Permisos, y revocar los permisos de cámara y/o ubicación.
Volver a abrir la app y confirmar que no se cierra ni se congela, sino que muestra los mensajes correspondientes y permite volver a conceder los permisos desde la propia aplicación.
Autor

Kevin Hidalgo Barrantes — Estudiante de Ingeniería en Computación, Tecnológico de Costa Rica.
