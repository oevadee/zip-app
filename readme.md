# Official zip-app repo

---

## Frontend

###### Current version: 2.00

### Running the app

```bash
#install dependencies
$ yarn

# development
$ yarn start

# build preview
$ yarn serve

# build
$ yarn build
```

#### example .env

[generatedHTPSLink](https://www.npmjs.com/package/localtunnel)

```
lt --port 8080
```

###### and

```
VITE_API_HOST_V2=<generatedHTTPSLink>
VITE_API_HOST=localhost:8080
```

##### Stack:

- react
- chakra-ui
- vite
- react-hook-form
- swr

---

## Backend:

###### Current version: 1.00

### Running the app

```bash
#install dependencies
$ yarn

# development
$ yarn start

# build
$ yarn build
```

#### example .env

```
NEO4J_HOST=localhost
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=<password>
SERVER=http://localhost:8080
STATIC_FILES_HOST=http://localhost:8080/static
PORT=8080
```

##### Stack:

- node/ts
- express
- multer
- jwt

---

#### DB:

- neo4j

---

##### Maintained by:

###### <a href="https://github.com/oevadee">

<span style="color:#36013f; text-decoration:none; font-weight:bold; letter-spacing: 1px;">@oevadee</span>
</a>

<a href="https://github.com/oopjot">
<span style="color:#36013f; text-decoration:none; font-weight:bold; letter-spacing: 1px;">@oopjot</span>
</a>
