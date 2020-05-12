# Services Folder

In this folder you should define all services and the controller that define the routes
of your web application. 

- `*.service.ts` contains class that have function to manipulate the entity.
- `*.controller.ts` contains all routes wrapped by controller.

Place those files in a folder. Name the folder with specific usage:
```
src/services
├── hello.controller.ts
└── user
    ├── user.controller.ts
    └── user.service.ts
```
