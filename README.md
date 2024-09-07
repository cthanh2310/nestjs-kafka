1. Run docker compose:
   `docker compose up -d --build`
2. Run source:
   `yarn & yarn start:dev`
3. Attach docker shell and then `cd /usr/bin`
4. create topic: `./kafka-topics --create --topic kris-topic --bootstrap-server localhost:29092 --partitions 1 --replication-factor 1`
5. Produce message: `./kafka-console-producer --topic kris-topic --bootstrap-server localhost:29092`
6. Consume message: `kafka-console-consumer --topic kris-topic --from-beginning --bootstrap-server localhost:29092`
