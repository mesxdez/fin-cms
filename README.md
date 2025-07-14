# Financial CMS - Next.js with InfinityFree Integration

A modern Content Management System built with Next.js, Material-UI, and integrated with InfinityFree MySQL database.

## Features

- 📝 Content Management (Create, Read, Update, Delete)
- 🏷️ Category and Tag Management
- 👥 User Authentication and Authorization
- 📊 Dashboard with Analytics
- 🎨 Modern Material-UI Design
- 🗄️ InfinityFree MySQL Database Integration
- 📱 Responsive Design

## InfinityFree Database Setup

### 1. Create InfinityFree Account

1. Go to [InfinityFree](https://infinityfree.net/)
2. Sign up for a free account
3. Create a new hosting account

### 2. Access MySQL Database

1. Log into your InfinityFree control panel
2. Go to "MySQL Databases" section
3. Create a new database
4. Note down your database credentials:
   - Host: `sql.infinityfree.com`
   - Username: `your_username`
   - Password: `your_password`
   - Database name: `your_database_name`
   - Port: `3306`

### 3. Environment Configuration

Create a `.env.local` file in your project root:

```env
# InfinityFree Database Configuration
DB_HOST=sql.infinityfree.com
DB_USER=your_infinityfree_username
DB_PASSWORD=your_infinityfree_password
DB_NAME=your_database_name
DB_PORT=3306

# JWT Secret for authentication
JWT_SECRET=your_jwt_secret_key_here

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd fin-cms
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   - Copy the `.env.local` example above
   - Replace with your actual InfinityFree credentials

4. **Initialize database**

   ```bash
   npm run dev
   ```

   Then visit: `http://localhost:3000/api/test-db` to initialize tables

5. **Seed sample data (optional)**
   ```bash
   curl -X POST http://localhost:3000/api/test-db \
     -H "Content-Type: application/json" \
     -d '{"action": "seed"}'
   ```

## Database Schema

The application automatically creates the following tables:

### Contents Table

- `id` - Primary key
- `title` - Content title
- `textHtml` - HTML content
- `banner` - Banner image URL
- `createdBy` - Author name
- `createdDate` - Creation timestamp
- `updatedBy` - Last editor
- `updatedDate` - Last update timestamp
- `status` - Draft/Published/Scheduled

### Categories Table

- `id` - Primary key
- `name` - Category name (unique)
- `description` - Category description
- `createdDate` - Creation timestamp
- `updatedDate` - Last update timestamp

### Tags Table

- `id` - Primary key
- `name` - Tag name (unique)
- `color` - Tag color hex code
- `createdDate` - Creation timestamp

### Users Table

- `id` - Primary key
- `username` - Username (unique)
- `password` - Hashed password
- `email` - Email address (unique)
- `role` - admin/editor/viewer
- `createdDate` - Account creation date
- `lastLogin` - Last login timestamp

### Junction Tables

- `content_tags` - Many-to-many relationship between contents and tags
- `content_categories` - Many-to-many relationship between contents and categories

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `PUT /api/auth/login` - User registration

### Contents

- `GET /api/contents` - List contents with pagination and filtering
- `POST /api/contents` - Create new content
- `GET /api/contents/[id]` - Get specific content
- `PUT /api/contents/[id]` - Update content
- `DELETE /api/contents/[id]` - Delete content

### Categories

- `GET /api/categories` - List categories
- `POST /api/categories` - Create new category
- `GET /api/categories/[id]` - Get specific category
- `PUT /api/categories/[id]` - Update category
- `DELETE /api/categories/[id]` - Delete category

### Tags

- `GET /api/tags` - List tags
- `POST /api/tags` - Create new tag
- `GET /api/tags/[id]` - Get specific tag
- `PUT /api/tags/[id]` - Update tag
- `DELETE /api/tags/[id]` - Delete tag

### Database Management

- `GET /api/test-db` - Test database connection and initialize tables
- `POST /api/test-db` - Seed sample data or reset database

## Default Users

After seeding the database, you can login with:

- **Admin**: username: `admin`, password: `admin`
- **Editor**: username: `editor`, password: `admin`
- **Viewer**: username: `viewer`, password: `admin`

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### InfinityFree Hosting

1. Build your project: `npm run build`
2. Upload the `.next` folder and other necessary files to your InfinityFree hosting
3. Configure environment variables in your hosting control panel

## Troubleshooting

### Database Connection Issues

1. Verify your InfinityFree credentials in `.env.local`
2. Check if your InfinityFree account is active
3. Ensure the database exists in your InfinityFree control panel
4. Test connection at `/api/test-db`

### Common Errors

- **ECONNREFUSED**: Check if InfinityFree is accessible
- **Access denied**: Verify username/password
- **Database doesn't exist**: Create database in InfinityFree control panel

## Security Notes

- Change default passwords after first login
- Use strong JWT secrets in production
- Consider using bcrypt for password hashing in production
- Implement rate limiting for API endpoints
- Use HTTPS in production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
