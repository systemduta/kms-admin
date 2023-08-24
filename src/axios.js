/**
 * Import statement import axios from "axios" mengimport library axios yang digunakan untuk membuat HTTP request. Baris kode const baseURL = process.env.VUE_APP_API_URL mendeklarasikan variabel bernama baseURL yang nilainya diambil dari environment variable VUE_APP_API_URL. Baris kode terakhir export default axios.create({ baseURL }) membuat instance axios baru dengan konfigurasi default yang telah ditentukan dan mengekspornya sebagai default export. Library axios dan instance yang dibuat dapat digunakan untuk membuat HTTP request ke server.
 */

import axios from 'axios'

const baseURL = process.env.VUE_APP_API_URL

export default axios.create({
  baseURL
})
