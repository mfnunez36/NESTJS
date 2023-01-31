## Contenido

- nestjs with typescript
- modules
- services
- typeorm db connection to mysql
- environment
- dtos
- entities
- custom decorators
- uth strategies
- jwt
- roles
- guards
- documentation swagger
- Envio de Email NodeMailer
- docker compose image mysql y phpmyadmin with containers

## Important Info

---

1. Ejecutar el comando `docker compose up -d` para implementar la base de datos en el entorno local
2. Ejecutar el comando `npm i` para instalar los paquetes de la aplicacion.
3. Ejcutar el comando `npm run start:dev` para ejecutar la aplicacion
4. para poder probar el envio de mail se debe cambiar las variables de entorno del archivo `.env: MAILDEV_INCOMING_USER | MAILDEV_INCOMING_PASS`
5. Abrir `http://localhost:3000/docs` para probar con la documentacion o importar el archivo en postman: `./postman-collection`
