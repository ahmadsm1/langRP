## langRP

Learn a language by role-playing it with a chatbot.

### Setup
You can find this project at [langrp.vercel.app]()

But if you want to run it locally:

In the `.env` file, add the MISTRAL_API_KEY. By default, it uses the Mistral API but if you'd like to use your own LLM, simple change `LOCAL` to true and run that LLM on port 8000.

The project can be ran with Docker via:
```
docker-compose up
```

### Testing