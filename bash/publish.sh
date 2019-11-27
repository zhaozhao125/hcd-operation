#!/bin/bash
cd ../
cnpm run go
cd dist
zip -r test.zip ./*