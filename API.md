# 📡 API Documentation

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### Projects

#### GET /api/projects
Pobierz wszystkie projekty

**Response:**
```json
[
  {
    "id": "1234567890-abc123",
    "name": "Moja wizytówka",
    "product_id": "wiz-85x55",
    "canvas_data": "{...}",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
]
```

#### GET /api/projects/:id
Pobierz projekt po ID

**Response:**
```json
{
  "id": "1234567890-abc123",
  "name": "Moja wizytówka",
  "product_id": "wiz-85x55",
  "canvas_data": "{...}",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z"
}
```

#### POST /api/projects
Utwórz nowy projekt

**Request:**
```json
{
  "name": "Moja wizytówka",
  "productId": "wiz-85x55",
  "canvasData": "{...}"
}
```

**Response:**
```json
{
  "id": "1234567890-abc123",
  "name": "Moja wizytówka",
  "product_id": "wiz-85x55",
  "canvas_data": "{...}",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z"
}
```

#### PUT /api/projects/:id
Zaktualizuj projekt

**Request:**
```json
{
  "name": "Nowa nazwa",
  "canvasData": "{...}",
  "thumbnail": "data:image/png;base64,..."
}
```

**Response:**
```json
{
  "id": "1234567890-abc123",
  "name": "Nowa nazwa",
  "product_id": "wiz-85x55",
  "canvas_data": "{...}",
  "thumbnail": "data:image/png;base64,...",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:45:00.000Z"
}
```

#### DELETE /api/projects/:id
Usuń projekt

**Response:**
```json
{
  "success": true
}
```

---

### Export

#### POST /api/export/pdf
Eksportuj projekt do PDF i zapisz na serwerze

**Request:**
```json
{
  "projectId": "1234567890-abc123",
  "canvasData": "{...}",
  "width": 85,
  "height": 55,
  "bleed": 3,
  "dpi": 300,
  "colorMode": "CMYK",
  "title": "Moja wizytówka"
}
```

**Response:**
```json
{
  "success": true,
  "filename": "1234567890-abc123_1705318200000.pdf",
  "url": "/exports/1234567890-abc123_1705318200000.pdf",
  "size": 245678,
  "message": "PDF wygenerowany pomyślnie"
}
```

#### POST /api/export/pdf/download
Pobierz PDF bezpośrednio (bez zapisywania na serwerze)

**Request:**
```json
{
  "canvasData": "{...}",
  "width": 85,
  "height": 55,
  "bleed": 3,
  "dpi": 300,
  "colorMode": "CMYK",
  "title": "Moja wizytówka"
}
```

**Response:**
Binary PDF file (application/pdf)

**Headers:**
- Content-Type: application/pdf
- Content-Disposition: attachment; filename="projekt_1705318200000.pdf"

#### POST /api/export/preview
Wygeneruj podgląd PNG projektu

**Request:**
```json
{
  "canvasData": "{...}",
  "width": 85,
  "height": 55,
  "dpi": 72
}
```

**Response:**
```json
{
  "success": true,
  "filename": "preview_1234567890-xyz789.png",
  "url": "/exports/preview_1234567890-xyz789.png",
  "size": 123456
}
```

#### GET /api/export/info/:projectId
Pobierz informacje o eksporcie projektu

**Response:**
```json
{
  "projectId": "1234567890-abc123",
  "hasPdf": true,
  "pdfUrl": "/exports/1234567890-abc123_1705318200000.pdf"
}
```

**Export Parameters:**
- `canvasData` (required): JSON z danymi canvas (Fabric.js)
- `width` (required): Szerokość w mm
- `height` (required): Wysokość w mm
- `bleed` (optional): Spad w mm (default: 3)
- `dpi` (optional): Rozdzielczość (default: 300)
- `colorMode` (optional): 'RGB' lub 'CMYK' (default: 'CMYK')
- `title` (optional): Tytuł dokumentu

---

### Upload

#### POST /api/upload
Wgraj plik (obraz)

**Request:**
- Content-Type: `multipart/form-data`
- Field name: `file`
- Allowed types: JPG, PNG, SVG, WebP
- Max size: 10MB

**Response:**
```json
{
  "id": "1234567890-xyz789",
  "filename": "1234567890-xyz789.jpg",
  "url": "/uploads/1234567890-xyz789.jpg",
  "mimetype": "image/jpeg",
  "size": 245678,
  "uploadedAt": "2024-01-15T10:30:00.000Z"
}
```

#### GET /api/upload
Pobierz listę wgranych plików

**Response:**
```json
[
  {
    "id": "1234567890-xyz789",
    "filename": "1234567890-xyz789.jpg",
    "url": "/uploads/1234567890-xyz789.jpg",
    "mimetype": "image/jpeg",
    "size": 245678,
    "uploadedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

### Orders

#### GET /api/orders
Pobierz wszystkie zamówienia

**Response:**
```json
[
  {
    "id": "1234567890-order1",
    "total_price": 150.50,
    "status": "pending",
    "customer_name": "Jan Kowalski",
    "customer_email": "jan@example.com",
    "customer_phone": "+48123456789",
    "created_at": "2024-01-15T10:30:00.000Z",
    "items": [
      {
        "id": "item1",
        "project_id": "proj1",
        "product_id": "wiz-85x55",
        "quantity": 100,
        "price": 0.50
      }
    ]
  }
]
```

#### GET /api/orders/:id
Pobierz zamówienie po ID

**Response:**
```json
{
  "id": "1234567890-order1",
  "total_price": 150.50,
  "status": "pending",
  "customer_name": "Jan Kowalski",
  "customer_email": "jan@example.com",
  "customer_phone": "+48123456789",
  "created_at": "2024-01-15T10:30:00.000Z",
  "items": [...]
}
```

#### POST /api/orders
Utwórz nowe zamówienie

**Request:**
```json
{
  "items": [
    {
      "projectId": "proj1",
      "productId": "wiz-85x55",
      "quantity": 100,
      "price": 0.50,
      "pdfUrl": "/exports/proj1.pdf"
    }
  ],
  "customerInfo": {
    "name": "Jan Kowalski",
    "email": "jan@example.com",
    "phone": "+48123456789",
    "address": "ul. Kwiatowa 1, Warszawa",
    "notes": "Prosimy o szybką realizację"
  }
}
```

**Response:**
```json
{
  "id": "1234567890-order1",
  "total_price": 50.00,
  "status": "pending",
  "customer_name": "Jan Kowalski",
  "customer_email": "jan@example.com",
  "customer_phone": "+48123456789",
  "customer_address": "ul. Kwiatowa 1, Warszawa",
  "customer_notes": "Prosimy o szybką realizację",
  "created_at": "2024-01-15T10:30:00.000Z",
  "items": [...]
}
```

#### PATCH /api/orders/:id/status
Zaktualizuj status zamówienia

**Request:**
```json
{
  "status": "processing"
}
```

Valid statuses: `pending`, `processing`, `completed`, `cancelled`

**Response:**
```json
{
  "id": "1234567890-order1",
  "status": "processing",
  "updated_at": "2024-01-15T11:00:00.000Z",
  ...
}
```

---

### Health Check

#### GET /api/health
Sprawdź status API

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## Error Responses

Wszystkie błędy zwracają odpowiedź w formacie:

```json
{
  "error": "Error message"
}
```

### HTTP Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

## Example Usage (JavaScript)

### Zapisz projekt

```javascript
const response = await fetch('http://localhost:3000/api/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Moja wizytówka',
    productId: 'wiz-85x55',
    canvasData: JSON.stringify(canvas.toJSON()),
  }),
});

const project = await response.json();
console.log('Projekt zapisany:', project.id);
```

### Wgraj obraz

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('http://localhost:3000/api/upload', {
  method: 'POST',
  body: formData,
});

const file = await response.json();
console.log('Plik wgrany:', file.url);
```

### Utwórz zamówienie

```javascript
const response = await fetch('http://localhost:3000/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    items: [
      {
        projectId: 'proj1',
        productId: 'wiz-85x55',
        quantity: 100,
        price: 0.50,
      },
    ],
    customerInfo: {
      name: 'Jan Kowalski',
      email: 'jan@example.com',
      phone: '+48123456789',
    },
  }),
});

const order = await response.json();
console.log('Zamówienie utworzone:', order.id);
```

### Eksportuj do PDF

```javascript
const canvas = fabricCanvas; // Twój Fabric.js canvas

const response = await fetch('http://localhost:3000/api/export/pdf/download', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    canvasData: JSON.stringify(canvas.toJSON()),
    width: 85, // mm
    height: 55, // mm
    bleed: 3, // mm
    dpi: 300,
    colorMode: 'CMYK',
    title: 'Moja wizytówka',
  }),
});

const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = 'wizytowka.pdf';
link.click();
```
