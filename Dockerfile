FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

RUN bun build

ENV PORT5175

CMD ["bun", "run", "dev"]
