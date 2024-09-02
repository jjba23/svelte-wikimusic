dev:
	nix --extra-experimental-features 'nix-command flakes' --accept-flake-config develop -c npm install && npm run dev
aws-upload:
	tar -czf master-release.tar.gz README.org COPYING build/*
	aws s3 ls
	aws s3 ls s3://wikimusic.jointhefreeworld.org/
	aws s3 rm s3://wikimusic.jointhefreeworld.org --recursive
	aws s3 cp build s3://wikimusic.jointhefreeworld.org/ --recursive
	aws s3 ls s3://wikimusic.jointhefreeworld.org/
