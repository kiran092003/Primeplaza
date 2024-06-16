/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
   
  ],
  theme: {
    extend: {
      colors:{
        'txt_col':'#706D3B',
        'log_btn':'#7A6910',
        'page_theam':'#f7f3eb',
        'txt':'#4d340a',
        'limited':'#ffe184',
        "col":'#174c4f'
      },
      fontFamily:{
        'logo':'Playfair Display'
      }
    },
  },
  plugins: [ 
  ],
}

