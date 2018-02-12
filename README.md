Pokec Graph Data Loader
=======================

This repository contains all data needed to produce a Docker image that
contains a graph that describes a social network. The original
data has been taken from

  [https://snap.stanford.edu/data/soc-pokec.html](https://snap.stanford.edu/data/soc-pokec.html)

We have added a stringified number as `region` Attribute, which will be used as a SmartGraph attribute for sharding.
Afterwards we have used the `smartifier` as described here:

  [https://www.arangodb.com/arangodb-smartifier/](https://www.arangodb.com/arangodb-smartifier/)

to transform the data into the SmartGraph format.

Creation of Docker image
------------------------

Use the following commands:

    docker build -t mchacki/pokecsmartgraph .
    docker push mchacki/pokecsmartgraph

Loading of data with Docker image
---------------------------------

To retrieve the data anywhere (where Docker is installed), use this command:

    docker run -it -v `pwd`:/data mchacki/pokecsmartgraph

This will create three files in the current directory:

    profiles_raw.json            - Vertices: User profiles
    relations_raw.json           - Edges: Relations between profiles 
    createGraphs.js              - JS script to create graphs

To import, simply run the following commands. Make sure that the arangosh command is run first. All later four can be done in an arbitrary order and even in parallel:
Install an enterprise `arangosh` on your system and run:

    ARANGODB_ADDRESS=<IP>:<PORT>
    arangosh --server.endpoint tcp://$ARANGODB_ADDRESS --javascript.execute "./createGraphs.js"
    docker run -it --net=host -v `pwd`:/data arangodb/arangodb arangoimp --server.endpoint tcp://$ARANGODB_ADDRESS --collection profiles_random --file /data/profiles_raw.json --type json --threads 8
    docker run -it --net=host -v `pwd`:/data arangodb/arangodb arangoimp --server.endpoint tcp://$ARANGODB_ADDRESS --collection relations_random --file /data/relations_raw.json --type json --threads 8 --from-collection-prefix "profiles_random" --to-collection-prefix "profiles_random"
    docker run -it --net=host -v `pwd`:/data arangodb/arangodb arangoimp --server.endpoint tcp://$ARANGODB_ADDRESS --collection profiles_smart --file /data/profiles_raw.json --type json --threads 8
    docker run -it --net=host -v `pwd`:/data arangodb/arangodb arangoimp --server.endpoint tcp://$ARANGODB_ADDRESS --collection relations_smart --file /data/relations_raw.json --type json --threads 8 --from-collection-prefix "profiles_smart" --to-collection-prefix "profiles_smart"
