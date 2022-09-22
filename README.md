# Example NextJS Contact Form

This NextJS app shows how to build a simple contact form using Plain's [Custom Timeline Entries](https://docs.plain.com/recipes/custom-timeline-entry-upsert). 

This example mainly consists of one [Next.js API Route](https://nextjs.org/docs/api-routes/introduction) (`/api/contact-form.tsx`) which calls the Plain API to:

- Create the customer within Plain of they don't exist
- Create a Custom Timeline Entry with the contents of the contact form 
- Moves the customer to the "Waiting for Help" queue

### Running the example:

You will need an API key from Plain first. [Check out our docs](https://docs.plain.com/core-api/authentication) on how to generate an API key.

For this demo you will need to grant the API key the following permissions:

- `timeline:create`
- `timeline:edit`
- `customer:create`
- `customer:edit`

**You will then need to add this key to the .env.local file:**

```shell
echo "PLAIN_API_KEY=plainApiKey_XXXXX" >> .env.local
```

After that you can run `npm install` followed by `npm run dev` to run the NextJS app and try it out!
