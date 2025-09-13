curl -X 'POST' \
  'http://localhost:5055/api/search' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "query": "How does Bill Gates handle difficult situations?",
  "type": "vector",
  "limit": 100,
  "search_sources": true,
  "search_notes": true,
  "minimum_score": 0.2
}' > result.json