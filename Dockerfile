FROM ubuntu
MAINTAINER Michael Hackstein <michael@arangodb.com>

COPY ./pokec_smart.tar.xz /
COPY ./untar.sh /
COPY ./install.sh /
COPY ./createGraphs.js /

RUN /install.sh

ENTRYPOINT ["/untar.sh"]
CMD ["/data"]
