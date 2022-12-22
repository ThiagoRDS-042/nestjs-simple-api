```mermaid
erDiagram

  authors {
    String id PK 
    String name  
    String email  
    String password  
    String phone  
    DateTime created_at  
    DateTime updated_at  
    DateTime deleted_at  "nullable"
    }
  

  posts {
    String id PK 
    String title  
    String content  
    String category  
    String authorId  
    DateTime publishedAt  
    DateTime created_at  
    DateTime updated_at  
    DateTime deleted_at  "nullable"
    }
  
    posts o{--|| authors : "author"
```
