# Cách chạy server backend

## Tạo env file (.env)

PORT=

MYSQL_HOST=
MYSQL_PORT=
MYSQL_USERNAME=
MYSQL_PASSWORD=
MYSQL_DATABASE=

với các giá trị của port, mysql_host,... là các giá trị mong muốn của bạn

# Tạo database

Trong BTL này, DBMS được sử dụng là MySQL. Để chạy được server, cần phải khởi tạo database với tên là giá trị của "MYSQL_DATABASE" trong file .env

## Cài đặt các thư viện

dùng lệnh "cd backend" để vào thư mục làm việc của backend, sau đó sử dụng lệnh "npm install" để cài đặt các thư viện có liên quan

## Chạy server

Sử dụng lệnh "npm run start" (môi trường prod), hoặc lệnh "npm run start:dev" để thuận tiện hơn cho việc chạy server ở môi trường dev.
