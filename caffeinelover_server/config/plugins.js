module.exports = ({ env }) => ({
  // Configuración para el plugin de autenticación y permisos
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET"), // Se obtiene desde las variables de entorno
    },
  },

  // Configuración para el envío de correos usando nodemailer
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Cambiar a true si usas SSL
        auth: {
          user: env("GMAIL_USER"), // Tu correo de Gmail
          pass: env("GMAIL_PASSWORD"), // Contraseña de aplicaciones de Gmail
        },
      },
      settings: {
        defaultFrom: env("GMAIL_USER"), // Remitente del correo
        defaultReplyTo: env("GMAIL_USER"), // Dirección de respuesta
      },
    },
  },
});
