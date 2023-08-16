# node_express boiler plate project with logging and sequelize

`npm install`
`cp .env.example .env`

update new .env file with correct info

`npm run dev`

setting up https:

```
openssl ecparam -name secp384r1 -genkey -noout -out private.pem
openssl ec -in private.pem -pubout -out public.pem
openssl req -new -x509 -key private.pem -out cert.pem -days 999
```