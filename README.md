# NodeJS fly.io sample

- Sample project for testing porpuses, also I'm checking all different ways of declaring env variables/secrets. All values here are not confidential, so...

# Login to fly.io
```powershell
choco install flyctl -y
flyctl auth login
```

# Run Dockerfile locally (optional)

```powershell
docker image build -t flyio-sample:1.0 .
docker container run -p 3000:3000 -d flyio-sample:1.0
docker container ls
docker container logs <CONTAINER_ID>
```

# Creating the volume
```powershell
flyctl platform regions
flyctl volumes create sample_data --region gru --size 1
```

# Deploy do flyctl
```powershell
flyctl launch --build-only
flyctl secrets set FLYIO_SECRET1="Some Value here from flyctl"
flyctl secrets set FLYIO_SECRET2="Another Value here from flyctl"
flyctl deploy
flyctl secrets list
```

###  If you access: https://your-app.fly.dev/secrets, will print:

```html
secrets fly.io:
{"FLYIO_SECRET2":"Another Value here from flyctl","FLYIO_SECRET1":"Some Value here from flyctl"}
secrets Dockerfile:
{"DOCKERFILE_SECRET1":"Some value here","DOCKERFILE_SECRET2":"AnotherValueHere"}
secrets .env:
{"DOTENV_SECRET1":"Some value here","DOTENV_SECRET2":"AnotherValueHere","DOTENV_SECRET3":"Another Value Here"}
secrets fly.toml:
{"FLYTOMLENV_SECRET1":"Some value here","FLYTOMLENV_SECRET2":"Another Value here"}
```

# Connect via SSH to manage volume data

- Get your access token: https://fly.io/user/personal_access_tokens
```powershell
flyctl ssh console --access-token <YOUR_ACCESS_TOKEN>
cd /usr/src/app/public
echo "<h1>Hi from volume!</h1>" > "test.html"
```
