# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Области хранения данных:
- БД json server
- BFF Backend for frontend
- Редакс стор

Сущности приложения:
- Пользователь: БД (список пользователей), BFF (сессия текущего), стор (отображение в браузере)
- Роль пользователя: БД (список ролей), BFF(сессия пользователя с ролью), стор (отображение на клиенте)
- Статья: БД (список статей), стор (отображение в браузере)
- Комментарий: БД (список коментов), стор (отображение в браузере)

Таблицы БД:
- Пользователи - users: id / login / password / registered_at / role_id 
- Роли - roles: name / id
- Статьи - posts: id / title / image_url / content / published_at
- Комментарии - comments: id / author_id / post_id / content

Схема состояния на BFF:
- Сессия текущего пользователя: login / password / role

Схема для редакс стора (на клиенте):
- User: id / login / role_id
- Posts: массив posts: id / title / imageUrl / publishedAt / commentsCount
- Post: id / title / imageUrl / publishedAt / content / comments: массив comment: id / author / publishedAt / content
- Users: массив user: id / login / registeredAt / role
