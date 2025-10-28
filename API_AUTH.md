# API Authentication

This blog API is protected with API key authentication. All POST requests to create blog posts require a valid API key.

## Setup

1. **Generate an API key** (if you haven't already):
   ```bash
   node scripts/generate-api-key.js
   ```

2. **Add the API key to your environment**:
   Create a `.env.local` file in the project root:
   ```bash
   API_KEY=your-generated-api-key-here
   ```

3. **Restart your development server**:
   ```bash
   npm run dev
   ```

## Usage

### Creating a Blog Post

```bash
curl -X POST http://localhost:3003/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "slug": "my-new-post",
    "title": "My New Post",
    "content": "# Introduction\n\nThis is my new post content in **markdown**.",
    "category": "technology"
  }'
```

### Getting All Posts

```bash
curl -X GET http://localhost:3003/api/posts \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Getting a Single Post

```bash
curl -X GET http://localhost:3003/api/posts/my-post-slug \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Security Notes

- **Keep your API key secret**: Never commit it to version control
- **Use HTTPS in production**: Always use secure connections
- **Rotate keys regularly**: Generate new keys periodically
- **Environment variables**: Store keys in `.env.local` (not committed to git)

## Error Responses

### Unauthorized (401)
```json
{
  "error": "Unauthorized",
  "message": "Valid API key required"
}
```

### Missing Fields (400)
```json
{
  "error": "Missing required fields"
}
```

### Invalid Category (400)
```json
{
  "error": "Invalid category"
}
```

## Categories

Valid categories are:
- `business`
- `technology`
- `philosophy`
- `science`
- `life`
