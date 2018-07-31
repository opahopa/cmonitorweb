#/bin/bash

#invalidate cf cache & cleanup
#upload files
aws s3 rm s3://codiusmonitor.com --recursive
aws s3 cp ./dist s3://codiusmonitor.com --recursive --metadata-directive REPLACE  --cache-control max-age=0,no-cache,no-store,must-revalidate  --acl public-read
#aws cloudfront create-invalidation --distribution-id E2XP3IM6PP62V6 --paths '/*'
