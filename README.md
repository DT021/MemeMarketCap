#### Commands

Inital Start
```bash
docker-compose up --build
```

Set Up Database
```bash
docker exec controllers flask db init
docker exec controllers flask db migrate
docker exec controllers flask db upgrade
```

Initial Reddit Database Build
```bash
docker exec controllers do scripts build
```

Build Template Market Train Data
```bash
docker exec controllers do scripts train_data
```

Train Template Market Mini-NNs
```bash
docker exec controllers do scripts train
```

Run Site Simulator
```bash
docker exec controllers do generate dbseed
```