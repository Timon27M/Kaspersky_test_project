# project

Для развертывания необходимм предустановленный Docker:
1) Запустить проект командой: docker-compose up --build

Также проект можно посмотреть в dev режиме:
1) Необходимо иметь MongoDB и запсустить его командой: mongod
2) Запустить сам проект командой: npm run start

# Project Name

## Описание
Веб-приложение на **React (TypeScript)** с серверной частью на **Node.js / Express.js / MongoDB**.  

## Бэкап:
- Файл для хранения бэкапа формата JSON

**Создание:**
Для создания необходимо выполнить GET запрос на http://localhost:3000/db/backup 

**Восстановление:**
Для восстановления необходимо выполнить POST запрос на http://localhost:3000/db/restore

---

## Технологии

**Frontend:**  
- React, Redux Toolkit, Redux Thunk, Redux Reselect  
- TypeScript  
- React Hook Form  
- Axios  
- SCSS  

**Backend:**  
- Node.js, Express.js  
- MongoDB  
- TypeScript  

**Развертывание:** 
- Docker

**GitHub репозиторий: https://github.com/Timon27M/Kaspersky_test_project** 

## Примечание
В процессе разработки для поиска информации и уточнения некоторых технических деталей я использовал, Google, ChatGPT как вспомогательный инструмент.
