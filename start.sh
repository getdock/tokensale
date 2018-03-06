#!/usr/bin/env sh

SOMAXCONN=65535

echo ${SOMAXCONN} 2>/dev/null > /proc/sys/net/core/somaxconn
sysctl net.core.somaxconn=${SOMAXCONN} 2>/dev/null

_term() {
    kill -HUP "$child" 2>/dev/null
}

trap _term TERM

nginx -c /app/nginx.conf &

child=$!
wait "$child"
