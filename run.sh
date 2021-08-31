#!/usr/bin/env bash

#----- functions -----#
docker_check() {
    #Open Docker, only if is not running
    echo "Checking Docker daemon..."
    if (! docker stats --no-stream > /dev/null 2>&1); then
        echo "Docker daemon not running, starting Docker daemon"
        open /Applications/Docker.app
        while (! docker stats --no-stream > /dev/null 2>&1); do
            echo "Waiting for Docker daemon to launch..."
            sleep 3
        done
    fi
    echo "Docker daemon running!"
}

build_db() {
    echo "Build Database"
    ./stand-up-db.sh
}

update_db() {
    echo "Updating Database"
    ./update-db.sh
}

docker_run() {
    echo "Build and run application"
    ./docker-run.sh
}

end() {
    #ring the bell for an audible signal!
    printf '\a'

    echo "Done!"
    cd ..

    echo "----- run.sh ----- END"
}

#----- begin script -----#
echo off >/dev/null
echo "----- run.sh ----- BEGIN"

docker_check

RUN_DOCKER=true
RUN_DB_BUILD=false
RUN_DB_UPDATE=false

cd bash || exit

while test $# -gt 0; do
    case "$1" in
    --first | -f | --reset | -r)
        RUN_DB_BUILD=true
        RUN_DOCKER=true
        ;;
    --migration | --migrations | --migrate | -m | --update | -u)
        RUN_DB_UPDATE=true
        RUN_DOCKER=false
        ;;
    --run )
        RUN_DOCKER=true
        ;;
    --*)
        echo "bad option $1"
        exit 1
        ;;
    *)
        echo "bad argument $1"
        exit 1
        ;;
    esac
    shift
done

if $RUN_DB_BUILD  ; then build_db   ; fi
if $RUN_DB_UPDATE ; then update_db  ; fi
if $RUN_DOCKER    ; then docker_run ; fi

end
exit 0
