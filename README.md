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