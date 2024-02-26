# The Z Network

Welcome to the repository for [Z](https://z.joshuaedo.com), a community-oriented social network. Join the conversation.

![Z Network Screenshot](https://github.com/joshuaedo/z/assets/107850649/fd192f11-edb6-4050-8b4a-9068d0a569b3)

## About This Project

Welcome to the Z Network, where diverse communities converge, passions flourish, and meaningful conversations unfold. As a dynamic social network inspired by the essence of Reddit and Twitter, Z Network is more than just a platform – it's a space where individuals connect, share ideas, and express themselves freely.

**Disclaimer:** This app is a work in progress, developed transparently in the public eye. Please refer to the roadmap below for insights into ongoing developments.

*Note: This is not a starter template.*

## ✨ Features

- **TypeScript:** Embrace the benefits of static typing.
- **Next.js 13 App Router:** Leverage the latest in Next.js for enhanced navigation.
- **Routing, Layouts, Nested Layouts, and Layout Groups:** Structured for intuitive navigation.
- **Data Fetching, Caching, and Mutation with React Query and Redis:** Optimize data interactions.
- **Loading UI:** Enhance user experience during data retrieval.
- **Route Handlers and Server Actions:** Manage server-side processes seamlessly.
- **API Routes and Middlewares:** Implement robust server-side logic.
- **Authentication using Next-Auth:** Secure user authentication.
- **ORM using Prisma:** Streamline database interactions.
- **Database on PlanetScale:** Opt for a reliable database solution.
- **UI Components built using Shadcn UI:** Crafted with a focus on aesthetics and functionality.
- **Styled using Tailwind CSS:** Combine utility-first and component-based styling.
- **Validation using Zod:** Ensure data integrity through robust validation.


## Roadmap

- [x] **Add Notification Feature**
- [x] **Add a Chat Feature**
- [ ] **Add a Welcome Message/Notification on Sign-Up**
- [ ] **Add Release Versioning**
- [ ] **Add Live-Chat Feature**
- [ ] **Add Push Notifications**
- [ ] **Add a Support Page**

Now, the items without an 'x' inside the square brackets will appear as unchecked checkboxes.

## Known Issues

Here is a list of ongoing challenges:

- Posts remain on the page after being deleted until the page is manually refreshed.
- The loader skeleton on the post page requires more padding.
- Loading Page on `loading.tsx` sometimes causes layout shifts, especially when signing in.
- Several color options are not functional on the profile theme.

## Running the Project Locally

To kickstart your journey with this repository locally, follow the steps below:

1. **Clone the Repo**
2. **Create a `.env.local` file in the project root:**

   ```env
   # Database Configuration
   DATABASE_URL="mysql://your_database_user:your_database_password@your_database_host/your_database_name?sslaccept=strict"
   
   # Google OAuth Credentials
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
   
   # NextAuth Configuration
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="https://your-app-url.com"
   
   # Pusher Configuration
   NEXT_PUBLIC_PUSHER_KEY="your_pusher_key"
   PUSHER_APP_ID="your_pusher_app_id"
   PUSHER_CLUSTER="your_pusher_cluster"
   PUSHER_SECRET="your_pusher_secret"
   
   # Redis Configuration
   NEXT_PUBLIC_REDIS_SECRET="your_redis_secret"
   NEXT_PUBLIC_REDIS_URL="https://your-redis-url.com"
   
   # UploadThing Configuration
   UPLOADTHING_APP_ID="your_uploadthing_app_id"
   UPLOADTHING_SECRET="your_uploadthing_secret"
   
   # Custom Configuration for Z Network
   Z_AUTHOR="Your Name"
   Z_URL="https://your-z-network-url.com"
   ```

   Fill out the values within your new `.env`, corresponding to your environment.

3. **Run the Development Server:**

   ```bash
   npm run dev or yarn dev
   ```

   The application should be accessible at `http://localhost:3000`.

## License

The Z Network is available as open source under the terms of the [MIT license](https://github.com/joshuaedo/z/blob/main/LICENSE).
