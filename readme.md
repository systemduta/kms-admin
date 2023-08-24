## Environment Variables

untuk menjalankan project ini harap install beberapa software dibawah

1. NPM versi 6.14
2. NodeJS versi 12.22

selain diatas akan menyebabkan error dalam melakukan running.

## Instalasi:

1. Jalankan perintah ini di git bash

```bash
git clone https://github.com/systemduta/kms-admin.git
```

2. Kemudian masuk ke folder 'kms-admin' atau bisa langsung dengan paste dan run command dibawah di git bash

```bash
cd kms-admin
```

3. Setelah itu alihkan ke branch "dev" dengan paste dan run command dibawah di git bash

```bash
git checkout --namaBranch
```

- branch digunakan untuk memisahkan antara code development dan code production
- branch master: untuk production
- branch dev: untuk development
- branch PAS-project: untuk fitur terbaru
- dan ada beberapa branch lain yang tidak teralu dipakai
- kalau mau upload ke production ada "guard" jadi harus manual ke web github dan masuk ke akun github engineer

4. Kemudian buka project di Visual studio code (sangat disarankan) atau bisa langsung dengan paste dan run command dibawah di git bash

```bash
code .
```

5. Kemudian ketik satu persatu perintah dibawah :

```bash
npm install
```

6. Atur koneksi api di .env

```bash
'online serve' => digunakan / un-comment saat project akan di upload ke server production
'staging serve' => tidak digunakan karena sudah pindah hosting
'local serve' => digunakan saat uji coba secara local bersamaan dengan project kms-api
'test git'  => digunakan untuk testing online sebelum di gunakan di production
```

7. Kemudian jalankan program

```bash
npm run serve
```

## Folder Reference

| Folder |  Description                |
| :-------- | :------------------------- |
| `docs`  | folder digunakan untuk dokumentasi |
| `dist`  | folder ini yang akan diupload di server atau bisa dikatakan ini hasil `build` |
| `node_modules`  | ini merupakan folder umum jika menggunakan `Node.js` berisi pustaka dari project (hasil dari `npm i`) |
| `public`  | folder ini merupakan bawaan dari VueJS |
| `src`  | folder berisi semua coding dari project |


## Documentation

[Documentation](https://github.com/systemduta/kms-admin/blob/dev/docs/doc.md)
