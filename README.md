# Pathfinding

Experiment in generating paths through graphs.

## Prerequisites

* You have a Linux or OSX machine. Windows should be supported via WSL 2 but has not been tested.
* You have installed a recent version of [GNU Make](https://www.gnu.org/software/make/).
* You have installed a recent version of [Docker](https://www.docker.com/).

## Quick Start

You can build the project for development using...

```
make
```

You can also package the project for distribution using...

```
make release
docker build -t pathfinding:latest .
```
## License

Licensed under [MIT](https://choosealicense.com/licenses/mit/).