# amip - trading backend

##### using FASTAPI (python)
# AMIP Trading Backend

A FastAPI-based backend service for the AMIP Trading platform that provides catalog search and management capabilities.

## Technology Stack

- Python 3.x
- FastAPI
- MongoDB
- Motor (Async MongoDB driver)
- Uvicorn (ASGI server)

## Setup Instructions

1. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Linux/Mac
# or
.\venv\Scripts\activate  # On Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=your_database_name
```

4. Start the application:
```bash
python amip-trading-backend/apps/fastapiApp/src
```

The application will be available at `http://localhost:8000` by default.

## API Documentation

The API documentation is available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Authentication
Before using any endpoints, you must generate an API key:

**Endpoint:** `POST /auth/api-key`

**Authentication:**
Basic Authentication is required:
```
Authorization: Basic base64(username:password)
```

**Response:**
```json
{
    "success": true,
    "api_key": "generated_api_key_string",
    "expires_at": "expire_date"
}
```

**Important:** All subsequent API calls must include the generated API key in the request header:
```
X-API-KEY: your_generated_api_key
```

### User ID Generation
Before using the search endpoints, new users must generate a user ID:

**Endpoint:** `POST /catalog/generate-user-id`

**Response:**
```json
{
    "success": true,
    "user_id": "generated_user_id_string"
}
```

### Key Endpoints

#### 1. Catalog Search
**Endpoint:** `POST /catalog/search`

Search for products in the catalog based on product name or number.

**Important:** You must first generate a user ID using `/catalog/generate-user-id` if you are a new user. The generated `user_id` is required for this endpoint.

**Parameters:**
- `page` (query, optional): Page number for pagination (default: 1)
- `page_size` (query, optional): Number of items per page (default: 10)

**Request Body:**
```json
{
    "user_id": "string",
    "catalog_name": "JINKU_CATALOG",
    "product_name": "string",
    "product_number": "string"
}
```
Note: Either `product_name` or `product_number` must be provided.

**Response:**
```json
{
    "success": true,
    "results": {
        "total": 0,
        "page": 1,
        "page_size": 10,
        "total_pages": 0,
        "products": [
            {
                "product_name": "string",
                "product_number": "string",
                "product_description": "string",
                "jinku_product_id": "string",
                "owner": "string",
                "specifications": ["string"],
                "product_image": "string"
            }
        ]
    }
}
```

#### 2. Catalog Cross-Search
**Endpoint:** `POST /catalog/cross-search`

Cross-reference search for products across catalogs using product ID.

**Important:** You must first generate a user ID using `/catalog/generate-user-id` if you are a new user. The generated `user_id` is required for this endpoint.

**Parameters:**
- `page` (query, optional): Page number for pagination (default: 1)
- `page_size` (query, optional): Number of items per page (default: 10)

**Request Body:**
```json
{
    "user_id": "string",
    "catalog_name": "JINKU_CATALOG",
    "product_mid": "string"
}
```

**Response:**
```json
{
    "success": true,
    "user_id": {
        "total": 0,
        "page": 1,
        "page_size": 10,
        "total_pages": 0,
        "products": [
            {
                "product_name": "string",
                "product_number": "string",
                "product_description": "string",
                "jinku_product_id": "string",
                "owner": "string",
                "specifications": ["string"],
                "product_image": "string"
            }
        ]
    }
}
```

### Additional Endpoints

- `GET /catalog/`: Index endpoint
- `GET /catalog/health-check`: Health check endpoint
- `POST /catalog/generate-user-id`: Generate a new user ID (required before using search endpoints)

## Error Handling

All endpoints return appropriate HTTP status codes:
- 200: Successful operation
- 400: Bad request (invalid input)
- 500: Internal server error

Error responses include:
```json
{
    "success": false,
    "error": "error message"
}
```

## Logging

The application uses a custom logging system that tracks:
- Request/Response details
- Performance metrics
- Error tracking
- User operations

## Development

The project follows a modular structure:
```
amip-trading-backend/
├── apps/
│   └── fastapiApp/
│       ├── auth/
│       └── platform/
│           └── modules/
│               └── catalog/
├── libs/
│   └── utils/
│       ├── common/
│       └── db/
└── requirements.txt
```

## Database Collections

Important collection names:
- Jinku Catalog: `jinku_catalog_data`
