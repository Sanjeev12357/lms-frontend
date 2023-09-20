# lms Frontend

### setup instruction

1.Clone the project

```
 git clone https://github.com/Sanjeev12357/lms-frontend.git
```

2.Move into the directory

```
    cd lms-frontend
```

3.install dependencies

```
    npm i
```

4.run the server
```
    npm run dev
```


###Setup instruction for tailwind

1.install tailwindcss
```
    npm install -D tailwindcss
```

2.create tailwind config file
```
    npx tailwindcss init 
```

3.add file extensions to tailwind config file

```
    "./src/**/*.{html,js,jsx,tsx}"
```
4.add the tailwind directive at the top of index.css file

```
    @tailwind base;
@tailwind components;
@tailwind utilities;
```

5.Add the following details int the plugins property of tailwind.congfig .js
```
  plugins: [require("daisyui"),require("@tailwindcss/line-clamp")],

```

###adding pugins and dependencies

```
    npm install @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp 
```

###configure auto import sort eslint
1.Instal simplem import sort
```
    npm i -D eslint-plugin-simple-import
```
2.add rule in '.seslint.cjs'

```
    'simple-import-sort/imports':'error'
```

3.add simple -import sort plufin in .eslint cjs
```
plugins [..],'simple -import-sort```





