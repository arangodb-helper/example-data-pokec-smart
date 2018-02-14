#!/bin/bash
cd $1
tar xJvf /pokec_smart.tar.xz
cp /createGraphs.js /data/pokec_smart
chown -R $UID:$GID /data/pokec_smart
