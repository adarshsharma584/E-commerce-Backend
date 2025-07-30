# E-Commerce Backend Project

A comprehensive Node.js/Express backend API for an e-commerce platform with user authentication, product management, and secure JWT-based authorization.

## 🚀 Features

### User Management
- User registration and login
- JWT-based authentication (Access & Refresh tokens)
- Password hashing with bcrypt
- User profile management (CRUD operations)
- Address management
- Role-based access (buyer, seller, admin)

### Product Management
- Product CRUD operations
- Category-based product filtering
- Seller-specific product management
- Product search by name
- Image upload support

### Security
- JWT token authentication
- HTTP-only cookies for refresh tokens
- Password encryption
- Input validation
- Error handling

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt
- **Environment Variables**: dotenv
- **Development**: nodemon

## 📁 Project Structure

```
Backend E.com/
├── controllers/
│   ├── user.controller.js      # User-related operations
│   └── products.controller.js   # Product-related operations
├── middlewares/
│   └── verifyJWT.js            # JWT verification middleware
├── models/
│   ├── user.model.js           # User schema with address
│   └── product.model.js        # Product schema
├── routes/
│   ├── user.route.js           # User API routes
│   └── product.route.js        # Product API routes
├── utils/
│   └── dbConnect.js            # MongoDB connection
├── config.env                  # Environment variables
├── index.js                    # Main server file
└── package.json               # Dependencies
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Backend E.com"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Update `config.env` with your values:
   ```env
   PORT=5000
   NODE_ENV=development
   ACCESS_TOKEN_SECRET=your_jwt_access_secret_key_here
   REFRESH_TOKEN_SECRET=your_jwt_refresh_secret_key_here
   MONGODB_URI=mongodb://localhost:27017/e-commerce
   ```

4. **Start MongoDB**
   - Local: Ensure MongoDB is running on your system
   - Cloud: Update MONGODB_URI with your MongoDB Atlas connection string

5. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/users/register` | Register new user | No |
| POST | `/users/login` | User login | No |
| POST | `/users/logout` | User logout | Yes |
| GET | `/users/profile` | Get user profile | Yes |
| PUT | `/users/update-profile` | Update user profile | Yes |
| PUT | `/users/update-password` | Update password | Yes |
| PUT | `/users/update-address` | Update user address | Yes |
| DELETE | `/users/delete` | Delete user account | Yes |

### Product Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products/all` | Get all products | No |
| GET | `/products/name/:name` | Get product by name | No |
| GET | `/products/category/:category` | Get products by category | No |
| POST | `/products/create` | Create new product | Yes |
| PUT | `/products/update/:id` | Update product | Yes |
| DELETE | `/products/delete/:id` | Delete product | Yes |

### Request Examples

#### User Registration
```bash
POST /api/v1/users/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "buyer",
  "flatNo": "101",
  "buildingName": "ABC Apartments",
  "street": "Main Street",
  "city": "New York",
  "state": "NY",
  "pincode": "10001",
  "phoneNo": "1234567890",
  "country": "USA",
  "profilePicture": "https://example.com/profile.jpg"
}
```

#### Product Creation
```bash
POST /api/v1/products/create
Content-Type: application/json
Authorization: Bearer <access_token>

{
  "name": "iPhone 14",
  "description": "Latest iPhone model",
  "price": 999,
  "stock": 50,
  "category": "Electronics",
  "images": ["image1.jpg", "image2.jpg"],
  "seller": "seller_user_id"
}
```

## 🔐 Authentication

This API uses JWT (JSON Web Tokens) for authentication:

- **Access Token**: Short-lived token for API requests (1 day)
- **Refresh Token**: Long-lived token stored in HTTP-only cookies (7 days)

### How to use:
1. Register/Login to get tokens
2. Include access token in Authorization header: `Bearer <access_token>`
3. Refresh token is automatically handled via cookies

## 🗄️ Database Schema

### User Model
```javascript
{
  fullName: String,
  email: String (unique),
  password: String (hashed),
  role: String (buyer/seller/admin),
  profilePicture: String,
  phoneNo: Number,
  refreshToken: String,
  address: [{
    flatNo: String,
    buildingName: String,
    street: String,
    city: String,
    state: String,
    country: String,
    pincode: String
  }],
  timestamps: true
}
```

### Product Model
```javascript
{
  name: String (unique),
  description: String,
  price: Number,
  stock: Number,
  category: String,
  images: [String],
  seller: ObjectId (ref: User),
  timestamps: true
}
```

## 🧪 Testing

Use tools like Postman, Insomnia, or curl to test the API endpoints.

### Sample Test Flow:
1. Register a new user
2. Login with credentials
3. Create a product (if seller)
4. Fetch all products
5. Update user profile
6. Logout

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
ACCESS_TOKEN_SECRET=your_secure_access_secret
REFRESH_TOKEN_SECRET=your_secure_refresh_secret
```

### Deployment Platforms
- **Heroku**: Add MongoDB Atlas connection
- **Railway**: Configure environment variables
- **DigitalOcean**: Use App Platform
- **AWS**: Deploy on EC2 or Elastic Beanstalk

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Adarsh Sharma**

## 🐛 Known Issues

- Ensure MongoDB is running before starting the server
- Update JWT secrets in production
- Configure CORS for frontend integration

## 🔮 Future Enhancements

- [ ] Order management system
- [ ] Payment integration
- [ ] Email verification
- [ ] File upload for product images
- [ ] Advanced search and filtering
- [ ] Rate limiting
- [ ] API documentation with Swagger
- [ ] Unit and integration tests