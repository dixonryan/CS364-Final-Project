Three containers

1. nginx webserver / reverse proxy
  /api --> :3000/api'

 TWO configuration files -- pick one in the nginx/Dockerfile 
    1. nginx/Dockerfile.COPY - copies the files to the webserver container
       this requires starting and stopping the container to add/remove/udate
       website files
    2. nginx/Dockerfile.MOUNT - does not copy, but references files for website
       this allows updates to website files to appear on the server
       without up/down of container
  change the config file being used by copying the one you want to the
  file named docker-compose.yml ... that way you can undo/redo which
  config (docker-compose.yml) file you use 


2. API 
  port 3000 is exposed for testing (not recommended in production system)
  GET / should return "server time"
  GET /api/ should return "API time"


3. PostgreSQL
 standard port
  


upgrades needed:
3. can't reference register function from server.js
4. add example developer pages
