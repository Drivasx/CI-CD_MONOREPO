# Pipeline CI/CD para Aplicación de 3 Capas

Este proyecto demuestra la implementación de un pipeline CI/CD end-to-end para una aplicación de arquitectura de 3 capas (presentación, lógica de negocio y datos) utilizando prácticas modernas de DevOps. El proyecto está estructurado como un monorepo que contiene una aplicación de gestión de tareas.

## 🎯 Objetivos del Proyecto

- Implementar un pipeline CI/CD completo
- Demostrar la automatización de pruebas, construcción y despliegue
- Aplicar prácticas de Infrastructure as Code (IaC)
- Implementar monitorización y observabilidad
- Mantener una arquitectura limpia de 3 capas

## 🏗️ Arquitectura

### Capas de la Aplicación

1. **Capa de Presentación (Frontend)**
   - React + TypeScript
   - Vite para build optimizado
   - Contenedorización con Docker

2. **Capa de Lógica de Negocio (Backend)**
   - Spring Boot API REST
   - Arquitectura hexagonal
   - Contenedorización con Docker

3. **Capa de Datos**
   - Base de datos relacional
   - Migración automática de esquemas
   - Persistencia con Spring Data JPA

## 🔄 Pipeline CI/CD

### Etapas del Pipeline

1. **Integración Continua (CI)**
   - Control de calidad de código
   - Pruebas unitarias y de integración
   - Análisis de seguridad
   - Build de imágenes Docker

2. **Entrega Continua (CD)**
   - Despliegue automático en ambientes de prueba
   - Pruebas end-to-end
   - Promoción a producción
   - Rollback automático

### Herramientas DevOps

- **Control de Versiones**: Git
- **CI/CD**: [Pendiente de implementar]
- **Contenedorización**: Docker
- **Orquestación**: Docker Compose

## 🚀 Estructura del Proyecto

El proyecto está organizado en dos componentes principales:

- `TasksAPI/`: API REST desarrollada con Spring Boot
- `TasksClient/`: Aplicación cliente desarrollada con React + TypeScript + Vite

## 📋 Prerequisitos

Para ejecutar este proyecto necesitarás:

- Java 17 o superior
- Maven 3.6 o superior
- Node.js 16 o superior
- PNPM (gestor de paquetes)
- Docker y Docker Compose (opcional, para contenedorización)

## 🛠️ Desarrollo Local

### Preparación del Entorno

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Drivasx/CI-CD_MONOREPO.git
   cd CI-CD_MONOREPO
   ```

2. Configura las variables de entorno:
   ```bash
   cp .env.example .env
   ```

### Backend (TasksAPI)

1. Navega al directorio del backend:
   ```bash
   cd TasksAPI
   ```

2. Compila el proyecto:
   ```bash
   ./mvnw clean install
   ```

3. Ejecuta la aplicación:
   ```bash
   ./mvnw spring-boot:run
   ```

El backend estará disponible en `http://localhost:8080`

### Frontend (TasksClient)

1. Navega al directorio del frontend:
   ```bash
   cd TasksClient
   ```

2. Instala las dependencias:
   ```bash
   pnpm install
   ```

3. Inicia la aplicación:
   ```bash
   pnpm dev
   ```

El frontend estará disponible en `http://localhost:5173`

## 🐳 Construcción y Despliegue

### Desarrollo Local con Docker

El proyecto incluye configuración Docker para todos los servicios. Para ejecutar el stack completo:

```bash
docker-compose up -d
```

### Pipeline CI/CD

El pipeline se activa automáticamente con cada push a las ramas principales:

1. **Feature Branches**:
   - Ejecuta pruebas
   - Análisis de código
   - Build de imágenes

2. **Develop**:
   - Todo lo anterior
   - Despliegue a ambiente de pruebas
   - Pruebas de integración

3. **Master**:
   - Todo lo anterior
   - Pruebas de seguridad
   - Despliegue a producción
   - Monitorización post-despliegue

### Monitorización

- Métricas de aplicación
- Logs centralizados
- Alertas automáticas
- Dashboards de rendimiento

## 🔧 Tecnologías Utilizadas

### Backend
- Spring Boot
- Spring Data JPA
- MapStruct para mapeo de objetos

### Frontend
- React 18
- TypeScript
- Vite
- Context API para gestión de estado

## 📚 API Endpoints

La API proporciona los siguientes endpoints para la gestión de tareas:

- `GET /api/tasks` - Obtener todas las tareas
- `POST /api/tasks` - Crear una nueva tarea
- `PUT /api/tasks/{id}` - Actualizar una tarea existente
- `DELETE /api/tasks/{id}` - Eliminar una tarea

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu funcionalidad (`git checkout -b feature/AmazingFeature`)
3. Realiza tus cambios
4. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
5. Push a la rama (`git push origin feature/AmazingFeature`)
6. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 🤝 Contacto

David Rivas - [@Drivasx](https://github.com/Drivasx)