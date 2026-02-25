#!/usr/bin/env bash

for dir in *; do
  if test -f "$dir/manifest.json"; then
    if test -d "$dir/react"; then
      pushd $dir
        vtex setup --typings
      popd
    fi
  fi
done
