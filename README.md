
# Система управления волонтерскими проектами и участниками

## Описание проекта

Веб-приложение предназначено для управления волонтёрскими проектами и участниками. Система позволяет создавать, просматривать, а также связывать волонтёров с конкретными проектами.


---

## Функциональные возможности

### Работа с проектами

1. Просмотр списка проектов
2. Создание нового проекта
3. Просмотр детальной информации о проекте

### Работа с волонтерами

1. Просмотр списка волонтёров
2. Создание нового волонтёра
3. Привязка волонтёра к проекту

---

## Используемые технологии

### Frontend

- Next.js
- TypeScript
- Tailwind CSS

### Backend

- Express.js
- TypeScript

### Хранение данных

Данные хранятся в массивах backend\src\store. 

---

## Структура проекта

<<<<<<< HEAD
```text
frontend/
├── app/
│   ├── projects/
│   │   ├── [id]/
│   │   │   ├── edit/
│   │   │   └── page.tsx
│   │   ├── new/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── volunteers/
│   │   ├── [id]/
│   │   │   └── edit/
│   │   ├── new/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
└── lib/

backend/
└── src/
    ├── routes/
    │   ├── projectRoutes.ts
    │   └── volunteerRoutes.ts
    ├── store/
    │   └── data.ts
    ├── types/
    │   ├── project.ts
    │   └── volunteer.ts
    └── server.ts
```
  
=======

frontend/
app/
    projects/
        [id]/
            edit/
            page.tsx
        new/
            page.tsx
        page.tsx
    volunteers/
        [id]/
            edit/
        new/
            page.tsx
        page.tsx
    layout.tsx
    page.tsx
components/
lib/



backend/
    src/
        routes/
            projectRoutes.ts
            volunteerRoutes.ts
        store/
            data.ts
        types/
            project.ts
            volunteer.ts
        server.ts  


>>>>>>> 90a7cd5 (Незначительные изменения)
---

## Запуск проекта

### Backend

В терминале VisualStudio:

```bash
cd backend
```

Установить зависимости:

```bash
npm install
```

Запустить сервер:

```bash
npm run dev
```

Сервер будет доступен по адресу:

```text
http://localhost:4000
```

---

### Frontend

В терминале VisualStudio:

```bash
cd frontend
```

Установить зависимости:

```bash
npm install
```

Запустить приложение:

```bash
npm run dev
```

Приложение будет доступно по адресу:

```text
http://localhost:3000
```

---

## Автор

Практическая работа. Штелле Данил Евгеньевич

Тема: «Система управления волонтерскими проектами и участниками».
