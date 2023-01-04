## Documentation

- Struktur Project

  1. docs - berisi dokumentasi dari project

  2. node_modules - berisi additional plugin yang akan otomatis terinstal ketika kita melakukan instalasi

  3. public - digunakan untuk menyimpan beberapa file yang akan dipanggil saat project di running

  4. src - berisi semua file js yang digunakan selama dalam project

  5. file .env digunakan untuk mengatur environment variabel yang digunakan selama dalam project. Di dalam file env ada alamat API (penjelasan lengkap ada pada tahap instalasi atau di file README.md)
  6. selain file/folder diatas adalah file system yang vital "jangan dirubah"

## file/folder yang harus diketahui

- file ' router.js ' -> digunakan untuk mengatur seluruh route dalam project dibantu dengan master.js. jadi saat kita ingin melihat kemana atau dimana letak suatu proses/view tinggal masuk ke router dan melihat dimana letaknya
- file ' master.js ' -> sama seperti router.js
- file ' axios.js ' -> digunakan untuk mengatur default axios
- folder ' maesa ' letaknya di /src/store/ -> digunakan untuk mengatur API dari server untuk mendapat/mengirim/menghapus data
- file ' store.js ' -> singkatnya digunakan untuk mendaftarkan file js yang sudah dibuat dalam folder maesa agar dapat digunakan.
- folder ' web-pages ' -> digunakan untuk mengatur tampilan dari website
