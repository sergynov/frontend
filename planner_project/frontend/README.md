# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Области хранения данных:
- БД mongoDB

Сущности приложения:
- Пользователь: БД (список пользователей)
- Доска: БД 
- Комментарий: БД (список коментов)

Таблицы БД:
- Пользователи - users: id / login / password / registered_at / role_id 
- Доски - boards: id / title / user_id
- Колонки - columns: id / titile / 
- Задачи - tasks: id / title / description / status / due_date
- Роли - roles: admin, guest

Схема состояния :
- Сессия текущего пользователя: login / password / role
 
 
 //

 Страницы:
 - Login 
 - Register
 - Main Page (board list)
 - One board page (with tasks)

Схема для редакс стора (на клиенте):
- User: id / login / role_id
- Posts: массив posts: id / title / imageUrl / publishedAt / commentsCount
- Post: id / title / imageUrl / publishedAt / content / comments: массив comment: id / author / publishedAt / content
- Users: массив user: id / login / registeredAt / role
