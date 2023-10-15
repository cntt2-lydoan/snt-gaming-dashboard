npm config set @snt:registry https://gitlab.com/api/v4/projects/32502357/packages/npm/
npm config set -- '//gitlab.com/api/v4/projects/32502357/packages/npm/:_authToken' "${pull_token_secret}"
