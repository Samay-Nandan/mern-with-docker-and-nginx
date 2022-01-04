## Client - 

            Create Docker Image

            - docker build -f Dockerfile -t client .

            Run Docker container

            - docker run -d -p 3000:80 client
## Server -

            Create Docker Image

            - docker build -f Dockerfile -t server .

            Run Docker container

            - docker run -d -p 5000:5000 --env-file ./.env server

## Running Both Client and Server -

            Create Images

            - docker-compose up -d

            Stop all Containers and remove all its related images

            - docker-compose down --rmi all

## Additional Docker commands

            Check Running containers

            - docker ps -a

            See inside running Docker Container or Image

            - docker exec -it <Container_Id> /bin/sh
            
            - docker exec -it <Image_Name> /bin/sh

            Prune Container or Image

            - docker container prune

            - docker image prune -a

            See Container Logs

            - docker container logs <Container_id>

            See Container or Image list 

            - docker container ls

            - docker image ls
