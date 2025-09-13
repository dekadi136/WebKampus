# Kampus Management Backend




Sebuah backend API untuk sistem akademik kampus yang mendukung manajemen dosen, mahasiswa, kelas, tugas, dan fitur khusus seperti banning & promosi ketua mahasiswa dengan menggunakan arsitektur RESTful API.

## Tech Stack

- [Express] 
- [Prisma ORM] 
- [PostgreSQL] 
- [JWT Authentication]
- [Nodemon]
- [Bcrypt] 


## Features

- Manajemen Dosen → CRUD data dosen & relasi ke kelas dan mata kuliah, untuk dosen hanya punya  satu role, yaitu **dosen**.
- Manajemen Mahasiswa → CRUD data mahasiswa & relasi ke tugas dan kelas, untuk mahasiswa memiliki dua role, yaitu role **mahasiswa** &  **korti**
- Tugas → Penugasan oleh dosen, status per mahasiswa (**ditugaskan**, **selesai**).
- Banned Mahasiswa → Bisa dilakukan oleh **dosen** & **korti**.
- Promosi Ketua Mahasiswa → Hanya **dosen** & **korti** yang dapat menaikkan role mahasiswa.


##  ERD (Entity Relationship Diagram)

![ERD](./docs/prisma-erd.svg)


## Important Information!

Supaya membuat aplikasi ini tidak terlalu kompleks dan panjang, ada beberapa hal yang dibatasi, yaitu :



- Saya hanya fokus pada 2 multirole entitas saja, yaitu **dosen** dan **mahasiswa**. Oleh karena itu ada model kelas dan mata kuliah yang sebenarnya dibuat oleh entitas **akademik**, hanya saja saya fokus 2 role itu, karena sedang fokus Skripsi.
- Sementara waktu, pengganti role entitas **akademik** akan digantikan dengan role entitas **dosen** untuk manajemen fitur CRUD model kelas dan mata kuliah.
- Code masih berantakan, karena saya masih belum menerapkan atau lebih tepatnya belum mempelajari mengenai efisiensi code dan best praktis code.



Semoga batasan ini tidak membaut kalian kecewa, dikarenakan disini kita sama - sama belajar.  **HIDUP JOKOWI**

##  Installation



Instal dependensi dan lalu jalankan server.

1. Clone repo
   ```bash
   git clone https://github.com/dekadi136/WebKampus.git
   cd WebKampus
2. Install dependencies
    ```bash
    npm install
3. Setup environment
    ```bash
    cp .env.example .env
4. Setup Prisma ORM
    ```bash
    npx prisma generate
5. Run server
    ```bash 
    nodemon index.js
**Selamat mencoba!**



   [express]: <http://expressjs.com>
   [Prisma ORM]: <https://www.prisma.io/>
   [PostgreSQL]: <https://www.postgresql.org/>
   [JWT Authentication]: <https://www.jwt.io/>
   [Nodemon]: <https://www.npmjs.com/package/nodemon>
   [Bcrypt]: <https://www.npmjs.com/package/bcrypt>

