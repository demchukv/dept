This is a dashboard project.

## Dept

Deployed on Vercel:
[https://dept-4zgn.vercel.app/](https://dept-4zgn.vercel.app/)

## Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
1. Build your container: `docker build -t nextjs-docker .`.
1. Run your container: `docker run -p 3000:3000 nextjs-docker`.

Pushing images
You can push a new image to this repository using the CLI:
`docker tag local-image:tagname new-repo:tagname`
`docker push new-repo:tagname`
Make sure to replace tagname with your desired image repository tag.
